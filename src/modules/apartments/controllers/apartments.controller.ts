import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateApartmentUseCase } from '../use-cases/createApartment.useCase';
import { GetApartmentsTableUseCase } from '../use-cases/getApartmentsTable.useCase';
import { CreateApartmentDto } from '../dtos/createApartments.dto';
import { GetApartmentsTableDto } from '../dtos/getApartmentsTable.dto';
import { DeleteMultipleApartmentsUseCase } from '../use-cases/deleteMultipleApartments.useCase';
import { DeleteApartmentUseCase } from '../use-cases/deleteApartment.useCase';
import { sleep } from 'src/utils/sleep';
import { DeleteMultipleApartmentsDto } from '../dtos/deleteMultipleApartments.dto';
import { GetApartmentsListUseCase } from '../use-cases/getApartmentsList.useCase';

@Controller('/apartments')
export class ApartmentsController {
  constructor(
    private readonly _getApartmentsList: GetApartmentsListUseCase,
    private readonly _createApartmentUseCase: CreateApartmentUseCase,
    private readonly _getApartmentsTableUseCase: GetApartmentsTableUseCase,
    private readonly _deleteApartmentUseCase: DeleteApartmentUseCase,
    private readonly _deleteMultipleApartmentsUseCase: DeleteMultipleApartmentsUseCase,
  ) {}
  @Post()
  async createApartment(@Body() data: CreateApartmentDto) {
    const id = await this._createApartmentUseCase.execute(data);
    return { message: 'Apartment created successfully', id, status: 200 };
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
    return { message: 'Data obtained successfully', data, status: 200 };
  }

  @Delete('/:id')
  async deleteApartment(@Param('id') id: string) {
    await sleep(2000);
    const data = await this._deleteApartmentUseCase.execute(id);
    return { message: 'Apartment deleted successfully', data, status: 200 };
  }

  @Post('/deleteMultiple')
  async deleteMultipleApartments(@Body() data: DeleteMultipleApartmentsDto) {
    const res = await this._deleteMultipleApartmentsUseCase.execute(data.ids);
    return {
      message: 'Apartments deleted successfully',
      data: res,
      status: 200,
    };
  }

  @Get('/list')
  async getApartmentsList() {
    const data = await this._getApartmentsList.execute();
    return { message: 'Apartments list', data, status: 200 };
  }
}
