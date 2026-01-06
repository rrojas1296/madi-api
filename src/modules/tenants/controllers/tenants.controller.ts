import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TenantsService } from '../services/tenants.service';
import { CreateTenantDto } from '../dtos/createTenants.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard';
import { type RequestWithUser } from 'src/modules/auth/interfaces/requestWithUser.interface';
import { GetTenantsTableDto } from '../dtos/getTenantsTable.dto';
import { GetTenantsTableUseCase } from '../use-cases/getTenantsTable.useCase';

@UseGuards(JwtGuard)
@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly _tenantsService: TenantsService,
    private readonly _getTenantsTableUseCase: GetTenantsTableUseCase,
  ) {}

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

  @Post('table')
  async getTenantsTable(
    @Query('documentType') documentType: string,
    @Query('nationality') nationality: string,
    @Query('apartmentId') apartmentId: string,
    @Query('entryDateStart') entryDateStart: string,
    @Query('entryDateEnd') entryDateEnd: string,
    @Query('paymentDayMin') paymentDayMin: string,
    @Query('paymentDayMax') paymentDayMax: string,
    @Body() body: GetTenantsTableDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    const data = await this._getTenantsTableUseCase.execute(
      body,
      {
        documentType,
        nationality,
        apartmentId,
        entryDateStart,
        entryDateEnd,
        paymentDayMin,
        paymentDayMax,
      },
      userId,
    );
    return { message: 'Data obtained successfully', data, status: 200 };
  }
}
