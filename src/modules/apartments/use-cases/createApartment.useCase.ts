import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from '../dtos/createApartments.dto';
import { ApartmentsEntity } from '../entities/apartments.entity';
import { ApartmentsRepository } from '../repositories/apartments.repository';

@Injectable()
export class CreateApartmentUseCase {
  constructor(private readonly _apartmentsRepository: ApartmentsRepository) {}
  execute(data: CreateApartmentDto) {
    const {
      name,
      internalCode,
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
      internalCode,
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
