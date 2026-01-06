import { Injectable } from '@nestjs/common';
import { ITenantsRepository } from '../types/tenantsRepository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TenantEntity } from '../entities/tenant.entity';
import { KnexService } from 'src/database/knex/knex.service';
import { GetTenantsTableDto } from '../dtos/getTenantsTable.dto';
import { FiltersTenantsTableDto } from '../dtos/filtersTenantsTable.dto';
import { Tenants } from '@prisma/client';

@Injectable()
export class TenantsRepository implements ITenantsRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _knexService: KnexService,
  ) {}
  async create(data: TenantEntity): Promise<string> {
    const t = data.toJSON();
    const newTenant = await this._prismaService.tenants.create({
      data: t,
    });
    return newTenant.id;
  }

  async getList(userId: string) {
    const tenants: { id: string; name: string }[] =
      await this._knexService.client
        .select('id', 'name')
        .from('Tenants')
        .where('ownerId', userId);
    return tenants;
  }

  async getDataTable(
    data: GetTenantsTableDto,
    filters: FiltersTenantsTableDto,
    userId: string,
  ) {
    const {
      documentType,
      nationality,
      apartmentId,
      entryDateStart,
      entryDateEnd,
      paymentDayMin,
      paymentDayMax,
    } = filters;

    const { page, limit, search } = data;
    const offset = (page - 1) * limit;

    const totalQuery = this._knexService.client
      .from('Tenants')
      .count('* as total')
      .where('ownerId', userId)
      .first() as Promise<{ total: string }>;

    const baseQuery = this._knexService.client
      .select('t.*', 'a.id as apartment_id', 'a.name as apartment_name')
      .from('Tenants as t')
      .leftJoin('Apartments as a', 't.apartmentId', 'a.id')
      .modify((qb) => {
        if (search) {
          qb.where((builder) => {
            builder
              .whereRaw('TRIM(t.name) ILIKE ?', [`%${search}%`])
              .orWhereRaw('TRIM(t.lastName) ILIKE ?', [`%${search}%`])
              .orWhereRaw('TRIM(t.email) ILIKE ?', [`%${search}%`])
              .orWhereRaw('TRIM(t.numberDocument) ILIKE ?', [`%${search}%`]);
          });
        }

        if (documentType) qb.whereIn('t.documentType', documentType.split(','));
        if (nationality) qb.whereIn('t.nationality', nationality.split(','));
        if (apartmentId) qb.where('t.apartmentId', apartmentId);

        if (entryDateStart) qb.where('t.entryDate', '>=', entryDateStart);
        if (entryDateEnd) qb.where('t.entryDate', '<=', entryDateEnd);

        if (paymentDayMin) qb.where('t.paymentDay', '>=', paymentDayMin);
        if (paymentDayMax) qb.where('t.paymentDay', '<=', paymentDayMax);
      })
      .where('t.ownerId', userId)
      .orderBy([
        {
          column: 't.createdAt',
          order: 'desc',
        },
        {
          column: 't.id',
          order: 'desc',
        },
      ]);

    const paginationQuery = baseQuery
      .clone()
      .offset(offset)
      .limit(limit) as Promise<
      (Tenants & { apartment_id?: string; apartment_name?: string })[]
    >;

    const pagesQuery = baseQuery
      .clone()
      .clearSelect()
      .clearOrder()
      .count('* as count')
      .first() as Promise<{ count: string }>;

    const [tenants, { total }, { count }] = await Promise.all([
      paginationQuery,
      totalQuery,
      pagesQuery,
    ]);

    const serializedData = tenants.map((t) => this.serialize(t));

    return {
      tenants: serializedData,
      total: parseInt(total),
      totalRequest: tenants.length,
      pages: Math.ceil(parseInt(count) / limit),
    };
  }

  private serialize(
    data: Tenants & { apartment_id?: string; apartment_name?: string },
  ) {
    const entity = new TenantEntity({
      ...data,
      birthDate: data.birthDate.toISOString(),
      entryDate: data.entryDate.toISOString(),
      outDate: data.outDate ? data.outDate.toISOString() : undefined,
      apartmentId: data.apartmentId || undefined,
      emergencyPhone: data.emergencyPhone || undefined,
    });

    return {
      ...entity.toJSON(),
      apartment: data.apartment_id
        ? { id: data.apartment_id, name: data.apartment_name }
        : null,
    };
  }
}
