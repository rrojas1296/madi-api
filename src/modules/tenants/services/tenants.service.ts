import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../repositories/tenants.repository';
import { CreateTenantDto } from '../dtos/createTenants.dto';
import { TenantEntity } from '../entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(private readonly _tenantsRepository: TenantsRepository) {}

  createTenant(data: CreateTenantDto) {
    const tenant = new TenantEntity(data);
    this._tenantsRepository.create(tenant);
  }
}
