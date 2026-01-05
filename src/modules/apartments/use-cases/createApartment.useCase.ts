import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from '../dtos/createApartments.dto';
import { ApartmentsEntity } from '../entities/apartments.entity';
import { ApartmentsRepository } from '../repositories/apartments.repository';

@Injectable()
export class CreateApartmentUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}

  execute(data: CreateApartmentDto, userId: string) {
    const d = new ApartmentsEntity({ ...data, ownerId: userId });
    return this._apartmentsRepository.create(d);
  }
}
