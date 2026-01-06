import { Injectable } from '@nestjs/common';
import { FiltersTenantsTableDto } from '../dtos/filtersTenantsTable.dto';
import { GetTenantsTableDto } from '../dtos/getTenantsTable.dto';
import { TenantsRepository } from '../repositories/tenants.repository';

@Injectable()
export class GetTenantsTableUseCase {
  constructor(private readonly _tenantsRepository: TenantsRepository) {}
  execute(
    data: GetTenantsTableDto,
    filters: FiltersTenantsTableDto,
    userId: string,
  ) {
    return this._tenantsRepository.getDataTable(data, filters, userId);
  }
}
