import { Injectable } from '@nestjs/common';
import { Apartments } from '@prisma/client';
import { ApartmentsEntity } from '../entities/apartments.entity';
import { IApartmentsRepository } from '../interfaces/apartmentsRepository.interface';
import { GetApartmentsTableDto } from '../dtos/getApartmentsTable.dto';
import { FiltersDataTableDto } from '../dtos/filtersDataTable.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KnexService } from 'src/database/knex/knex.service';

@Injectable()
export class ApartmentsRepository implements IApartmentsRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _knexService: KnexService,
  ) {}

  async create(apartment: ApartmentsEntity): Promise<string> {
    const data = apartment.toJSON();
    const newApartment = await this._prismaService.apartments.create({
      data,
    });
    return newApartment.id;
  }

  async get(): Promise<ApartmentsEntity[]> {
    const data: Apartments[] = await this._knexService
      .client('Apartments as ap')
      .select('*');
    return data.map((i) => this.serialize(i));
  }

  async getList(userId: string) {
    const data: { id: string; name: string }[] = await this._knexService.client
      .select('name', 'id')
      .from('Apartments')
      .where('ownerId', userId)
      .where('deleted', false);
    return data;
  }

  async delete(id: string): Promise<string> {
    await this._prismaService.apartments.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return id;
  }

  async deleteMultiple(ids: string[]): Promise<string[]> {
    await this._knexService
      .client('Apartments as ap')
      .update('deleted', true)
      .whereIn('id', ids);
    return ids;
  }

  async getDataTable(
    data: GetApartmentsTableDto,
    filters: FiltersDataTableDto,
    userId: string,
  ) {
    const {
      monthlyFeeMax,
      monthlyFeeMin,
      roomsMax,
      roomsMin,
      areaMax,
      areaMin,
      status,
      currency,
      pets,
      furnished,
    } = filters;

    const { page, limit, search } = data;
    const offset = (page - 1) * limit;
    const totalQuery = this._knexService.client
      .from('Apartments')
      .count('* as total')
      .where('deleted', false)
      .where('ownerId', userId)
      .first() as Promise<{ total: string }>;

    const baseQuery = this._knexService.client
      .select('*')
      .from('Apartments as ap')
      .modify((qb) => {
        if (search) qb.whereRaw('TRIM(ap.name) ILIKE ?', [`%${search}%`]);
        if (monthlyFeeMin) qb.where('ap.monthlyFee', '>=', monthlyFeeMin);
        if (monthlyFeeMax) qb.andWhere('ap.monthlyFee', '<=', monthlyFeeMax);

        if (roomsMin) qb.andWhere('ap.rooms', '>=', roomsMin);
        if (roomsMax) qb.andWhere('ap.rooms', '<=', roomsMax);

        if (areaMin) qb.andWhere('ap.area', '>=', areaMin);
        if (areaMax) qb.andWhere('ap.area', '<=', areaMax);

        if (status) qb.whereIn('ap.status', status.split(','));
        if (currency) qb.whereIn('ap.currency', currency.split(','));

        if (pets)
          qb.whereIn(
            'ap.pets',
            pets.split(',').map((i) => i === 'true'),
          );
        if (furnished)
          qb.whereIn(
            'ap.furnished',
            furnished.split(',').map((i) => i === 'true'),
          );
      })
      .where('ap.deleted', false)
      .where('ap.ownerId', userId)
      .orderBy([
        {
          column: 'ap.createdAt',
          order: 'desc',
        },
        {
          column: 'ap.id',
          order: 'desc',
        },
      ]);
    const paginationQuery = baseQuery
      .clone()
      .offset(offset)
      .limit(limit) as Promise<Apartments[]>;
    const pagesQuery = baseQuery
      .clone()
      .clearSelect()
      .clearOrder()
      .count('* as count')
      .first() as Promise<{ count: string }>;

    const [apartments, { total }, { count }] = await Promise.all([
      paginationQuery,
      totalQuery,
      pagesQuery,
    ]);
    const serializedData = apartments.map((a) => this.serialize(a));
    return {
      apartments: serializedData,
      total: parseInt(total),
      totalRequest: apartments.length,
      pages: Math.ceil(parseInt(count) / limit),
    };
  }

  private serialize(data: Apartments): ApartmentsEntity {
    return new ApartmentsEntity({
      ...data,
      area: Number(data.area),
      garanty: Number(data.garanty),
      monthlyFee: Number(data.monthlyFee),
      maintenanceFee: Number(data.maintenanceFee),
    });
  }
}
