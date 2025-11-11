import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ApartmentsEntity } from './entities/apartments.entity';
import { IApartmentsRepository } from './interfaces/apartmentsRepository.interface';
import { Apartments } from '@prisma/client';

@Injectable()
export class ApartmentsRepository implements IApartmentsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: ApartmentsEntity): Promise<string> {
    const apartment = await this._prismaService.apartments.create({
      data,
    });
    return apartment.id;
  }

  async get(): Promise<ApartmentsEntity[]> {
    const data = await this._prismaService.apartments.findMany();
    return data.map((i) => this.serialize(i));
  }

  private serialize(data: Apartments): ApartmentsEntity {
    return new ApartmentsEntity({
      id: data.id,
      address: data.address,
      area: Number(data.area),
      bathrooms: data.bathrooms,
      condition: data.condition,
      currency: data.currency,
      floor: data.floor,
      floors: data.floors,
      furnished: data.furnished,
      garanty: Number(data.garanty),
      internalCode: data.internalCode,
      monthlyFee: Number(data.monthlyFee),
      name: data.name,
      persons: data.persons,
      pets: data.pets,
      rooms: data.rooms,
      status: data.status,
      maintenanceFee: Number(data.maintenanceFee),
      parking: data.parking,
    });
  }
}
