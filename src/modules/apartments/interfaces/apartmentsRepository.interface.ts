import { FiltersDataTableDto } from '../dtos/filtersDataTable.dto';
import { GetApartmentsTableDto } from '../dtos/getApartmentsTable.dto';
import { ApartmentsEntity } from '../entities/apartments.entity';

export interface IApartmentsRepository {
  create(data: ApartmentsEntity): Promise<string>;
  getDataTable(
    data: GetApartmentsTableDto,
    filters: FiltersDataTableDto,
  ): Promise<{
    apartments: ApartmentsEntity[];
    totalRequest: number;
    pages: number;
    total: number;
  }>;
}
