import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateApartmentUseCase } from '../use-cases/createApartment.useCase';
import { GetApartmentsTableUseCase } from '../use-cases/getApartmentsTable.useCase';
import { CreateApartmentDto } from '../dtos/createApartments.dto';
import { GetApartmentsTableDto } from '../dtos/getApartmentsTable.dto';

@Controller('/apartments')
export class ApartmentsController {
  constructor(
    private readonly _createApartmentUseCase: CreateApartmentUseCase,
    private readonly _getApartmentsTableUseCase: GetApartmentsTableUseCase,
  ) {}
  @Post()
  async createApartment(@Body() data: CreateApartmentDto) {
    const id = await this._createApartmentUseCase.execute(data);
    return { message: 'Apartment created successfully', id };
  }

  @Post('/table')
  async getApartmentsTable(
    @Query('status') status: string,
    @Query('currency') currency: string,
    @Query('monthlyFeeMin') monthlyFeeMin: string,
    @Query('monthlyFeeMax') monthlyFeeMax: string,
    @Query('roomsMin') roomsMin: string,
    @Query('roomsMax') roomsMax: string,
    @Query('areaMin') areaMin: string,
    @Query('areaMax') areaMax: string,
    @Query('pets') pets: string,
    @Query('furnished') furnished: string,
    @Body() body: GetApartmentsTableDto,
  ) {
    const data = await this._getApartmentsTableUseCase.execute(body, {
      status,
      currency,
      monthlyFeeMin,
      monthlyFeeMax,
      roomsMin,
      roomsMax,
      areaMin,
      areaMax,
      pets,
      furnished,
    });
    return { message: 'Data obtained successfully', data };
  }
}
