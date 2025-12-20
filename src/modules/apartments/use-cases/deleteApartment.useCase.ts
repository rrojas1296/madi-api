import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from '../repositories/apartments.repository';

@Injectable()
export class DeleteApartmentUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(id: string) {
    return this._apartmentsRepository.delete(id);
  }
}
