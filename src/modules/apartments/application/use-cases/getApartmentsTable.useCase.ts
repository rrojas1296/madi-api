import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from '../../domain/apartments.repository';

@Injectable()
export class GetApartmentsTableUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute() {
    return this._apartmentsRepository.get();
  }
}
