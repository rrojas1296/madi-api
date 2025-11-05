import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from '../dtos/createApartments.dto';
import { ApartmentsRepository } from '../../domain/apartments.repository';
import { ApartmentsEntity } from '../../domain/entities/apartments.entity';

@Injectable()
export class CreateApartmentUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(data: CreateApartmentDto) {
    const {
      name,
      code,
      floor,
      address,
      area,
      status,
      parking,
      persons,
      rooms,
      bathrooms,
      floors,
      condition,
      furnished,
      pets,
      monthlyFee,
      garanty,
      currency,
      maintenanceFee,
    } = data;
    const d = new ApartmentsEntity({
      name,
      code,
      floor,
      address,
      area,
      status,
      parking,
      persons,
      rooms,
      bathrooms,
      floors,
      condition,
      furnished,
      pets,
      monthlyFee,
      garanty,
      currency,
      maintenanceFee,
    });
    return this._apartmentsRepository.create(d);
  }
}
