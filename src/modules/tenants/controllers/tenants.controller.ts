import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantDto } from '../dtos/createTenants.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { type RequestWithUser } from 'src/modules/auth/interfaces/requestWithUser.interface';

@UseGuards(JwtGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly _tenantsService: TenantsService) {}

  @Post('create')
  async create(@Body() data: CreateTenantDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const tenantId = await this._tenantsService.createTenant(data, userId);
    return { message: 'Tenant created', tenantId, status: 201 };
  }

  @Get('list')
  async getTenantsList(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    const tenants = await this._tenantsService.getTenantsList(userId);
    return { message: 'Tenants list', tenants, status: 200 };
  }
}
