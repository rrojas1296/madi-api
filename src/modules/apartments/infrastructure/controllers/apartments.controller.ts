import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateApartmentDto } from '../../application/dtos/createApartments.dto';
import { CreateApartmentUseCase } from '../../application/use-cases/createApartment.useCase';
import { GetApartmentsTableUseCase } from '../../application/use-cases/getApartmentsTable.useCase';
import { FiltersDataTableDto } from '../../application/dtos/filtersDataTable.dto';
import { GetApartmentsTableDto } from '../../application/dtos/getApartmentsTable.dto';

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
    const filters: FiltersDataTableDto = {
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
    };
    const data = await this._getApartmentsTableUseCase.execute(body, filters);
    return { message: 'Data obtained successfully', data };
  }
}
