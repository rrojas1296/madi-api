import { Injectable } from '@nestjs/common';
import { ITenantsRepository } from '../types/tenantsRepository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TenantEntity } from '../entities/tenant.entity';
import { KnexService } from 'src/database/knex/knex.service';

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
}
