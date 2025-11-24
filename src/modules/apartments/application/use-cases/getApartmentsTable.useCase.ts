import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from '../../domain/apartments.repository';
import { FiltersDataTableDto } from '../dtos/filtersDataTable.dto';
import { GetApartmentsTableDto } from '../dtos/getApartmentsTable.dto';

@Injectable()
export class GetApartmentsTableUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(data: GetApartmentsTableDto, filters: FiltersDataTableDto) {
    return this._apartmentsRepository.getDataTable(data, filters);
  }
}
