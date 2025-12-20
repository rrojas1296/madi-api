import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from '../repositories/apartments.repository';

@Injectable()
export class DeleteMultipleApartmentsUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}

  execute(ids: string[]) {
    return this._apartmentsRepository.deleteMultiple(ids);
  }
}
