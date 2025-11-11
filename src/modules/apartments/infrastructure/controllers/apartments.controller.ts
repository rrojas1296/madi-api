import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateApartmentDto } from '../../application/dtos/createApartments.dto';
import { CreateApartmentUseCase } from '../../application/use-cases/createApartment.useCase';
import { sleep } from 'src/utils/sleep';
import { GetApartmentsTableUseCase } from '../../application/use-cases/getApartmentsTable.useCase';

@Controller('/apartments')
export class ApartmentsController {
  constructor(
    private readonly _createApartmentUseCase: CreateApartmentUseCase,
    private readonly _getApartmentsTableUseCase: GetApartmentsTableUseCase,
  ) {}
  @Post()
  async createApartment(@Body() data: CreateApartmentDto) {
    await sleep(3000);
    const id = await this._createApartmentUseCase.execute(data);
    return { message: 'Apartment created successfully', id };
  }

  @Get('/table')
  async getApartmentsTable() {
    await sleep(1000);
    const data = await this._getApartmentsTableUseCase.execute();
    console.log({ data });
    return { message: 'Data obtained successfully', data };
  }
}
