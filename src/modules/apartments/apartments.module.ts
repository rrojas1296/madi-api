import { Module } from '@nestjs/common';
import { ApartmentsController } from './infrastructure/controllers/apartments.controller';
import { ApartmentService } from './infrastructure/services/apartments.service';
import { CreateApartmentUseCase } from './application/use-cases/createApartment.useCase';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentService, CreateApartmentUseCase],
})
export class ApartmentsModule {}
