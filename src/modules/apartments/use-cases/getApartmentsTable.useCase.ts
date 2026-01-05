import { Injectable } from '@nestjs/common';
import { FiltersDataTableDto } from '../dtos/filtersDataTable.dto';
import { GetApartmentsTableDto } from '../dtos/getApartmentsTable.dto';
import { ApartmentsRepository } from '../repositories/apartments.repository';

@Injectable()
export class GetApartmentsTableUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(
    data: GetApartmentsTableDto,
    filters: FiltersDataTableDto,
    userId: string,
  ) {
    return this._apartmentsRepository.getDataTable(data, filters, userId);
  }
}
