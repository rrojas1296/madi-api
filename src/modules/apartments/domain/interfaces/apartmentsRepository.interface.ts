import { FiltersDataTableDto } from '../../application/dtos/filtersDataTable.dto';
import { ApartmentsEntity } from '../entities/apartments.entity';

export interface IApartmentsRepository {
  create(data: ApartmentsEntity): Promise<string>;
  getDataTable(
    searchText: string,
    filters: FiltersDataTableDto,
  ): Promise<{ apartments: ApartmentsEntity[]; total: number }>;
}
