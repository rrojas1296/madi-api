import { Injectable } from '@nestjs/common';
import { ApartmentsRepository } from '../repositories/apartments.repository';

@Injectable()
export class GetApartmentsListUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(userId: string) {
    return this._apartmentsRepository.getList(userId);
  }
}
