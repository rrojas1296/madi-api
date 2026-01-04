import { Injectable } from '@nestjs/common';
import { ITenantsRepository } from '../types/tenantsRepository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class TenantsRepository implements ITenantsRepository {
  constructor(private readonly _prismaService: PrismaService) {}
  async create(data: TenantEntity): Promise<string> {
    const t = data.toJSON();
    const newTenant = await this._prismaService.tenants.create({
      data: t,
    });
    return newTenant.id;
  }
}
