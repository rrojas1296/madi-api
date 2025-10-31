import { Body, Controller, Post } from '@nestjs/common';
import { CreateApartmentDto } from '../../application/dtos/createApartments.dto';
import { CreateApartmentUseCase } from '../../application/use-cases/createApartment.useCase';

@Controller('/apartments')
export class ApartmentsController {
  constructor(
    private readonly _createApartmentUseCase: CreateApartmentUseCase,
  ) {}
  @Post()
  async createApartment(@Body() data: CreateApartmentDto) {
    this._createApartmentUseCase.execute(data);
    return { message: 'Apartment created successfully' };
  }
}
