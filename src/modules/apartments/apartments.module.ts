import { Module } from '@nestjs/common';
import { ApartmentsController } from './controllers/apartments.controller';
import { CreateApartmentUseCase } from './use-cases/createApartment.useCase';
import { GetApartmentsTableUseCase } from './use-cases/getApartmentsTable.useCase';
import { ApartmentsRepository } from './repositories/apartments.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { KnexModule } from 'src/database/knex/knex.module';
import { DeleteApartmentUseCase } from './use-cases/deleteApartment.useCase';
import { DeleteMultipleApartmentsUseCase } from './use-cases/deleteMultipleApartments.useCase';
import { GetApartmentsListUseCase } from './use-cases/getApartmentsList.useCase';

@Module({
  controllers: [ApartmentsController],
  providers: [
    CreateApartmentUseCase,
    GetApartmentsTableUseCase,
    ApartmentsRepository,
    DeleteApartmentUseCase,
    DeleteMultipleApartmentsUseCase,
    GetApartmentsListUseCase,
  ],
  imports: [PrismaModule, KnexModule],
})
export class ApartmentsModule {}
