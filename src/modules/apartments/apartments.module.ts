import { Module } from '@nestjs/common';
import { ApartmentsController } from './infrastructure/controllers/apartments.controller';
import { CreateApartmentUseCase } from './application/use-cases/createApartment.useCase';
import { ApartmentsRepository } from './domain/apartments.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { GetApartmentsTableUseCase } from './application/use-cases/getApartmentsTable.useCase';

@Module({
  controllers: [ApartmentsController],
  providers: [
    CreateApartmentUseCase,
    GetApartmentsTableUseCase,
    ApartmentsRepository,
  ],
  imports: [PrismaModule],
})
export class ApartmentsModule {}
