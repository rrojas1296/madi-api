import { Body, Controller, Post } from '@nestjs/common';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantDto } from '../dtos/createTenants.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly _createTenantService: TenantsService) {}

  @Post('create')
  create(@Body() data: CreateTenantDto) {
    return this._createTenantService.createTenant(data);
  }
}
