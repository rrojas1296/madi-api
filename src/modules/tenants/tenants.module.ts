import { Module } from '@nestjs/common';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsService } from './services/tenants.service';
import { TenantsRepository } from './repositories/tenants.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { KnexModule } from 'src/database/knex/knex.module';
import { GetTenantsTableUseCase } from './use-cases/getTenantsTable.useCase';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, TenantsRepository, GetTenantsTableUseCase],
  imports: [PrismaModule, KnexModule],
  exports: [],
})
export class TenantsModule {}
