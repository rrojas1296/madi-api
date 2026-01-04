import { Module } from '@nestjs/common';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsService } from './services/tenants.service';
import { TenantsRepository } from './repositories/tenants.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, TenantsRepository],
  imports: [PrismaModule],
  exports: [],
})
export class TenantsModule {}
