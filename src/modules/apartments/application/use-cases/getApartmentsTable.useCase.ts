import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from '../../domain/apartments.repository';
import { FiltersDataTableDto } from '../dtos/filtersDataTable.dto';

@Injectable()
export class GetApartmentsTableUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(searchText: string, filters: FiltersDataTableDto) {
    return this._apartmentsRepository.getDataTable(searchText, filters);
  }
}
