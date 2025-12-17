import { Module } from '@nestjs/common';
import { ApartmentsController } from './controllers/apartments.controller';
import { CreateApartmentUseCase } from './use-cases/createApartment.useCase';
import { GetApartmentsTableUseCase } from './use-cases/getApartmentsTable.useCase';
import { ApartmentsRepository } from './repositories/apartments.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { KnexModule } from 'src/database/knex/knex.module';

@Module({
  controllers: [ApartmentsController],
  providers: [
    CreateApartmentUseCase,
    GetApartmentsTableUseCase,
    ApartmentsRepository,
  ],
  imports: [PrismaModule, KnexModule],
})
export class ApartmentsModule {}
