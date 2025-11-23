import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ApartmentsEntity } from './entities/apartments.entity';
import { IApartmentsRepository } from './interfaces/apartmentsRepository.interface';
import { Apartments } from '@prisma/client';
import { KnexService } from 'src/infrastructure/knex/knex.service';
import { FiltersDataTableDto } from '../application/dtos/filtersDataTable.dto';

@Injectable()
export class ApartmentsRepository implements IApartmentsRepository {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _knexService: KnexService,
  ) {}

  async create(data: ApartmentsEntity): Promise<string> {
    const apartment = await this._prismaService.apartments.create({
      data,
    });
    return apartment.id;
  }

  async get(): Promise<ApartmentsEntity[]> {
    const data = await this._prismaService.apartments.findMany();
    console.log({ data });
    return data.map((i) => this.serialize(i));
  }

  async getDataTable(searchText: string, filters: FiltersDataTableDto) {
    const {
      monthlyFeeMax,
      monthlyFeeMin,
      roomsMax,
      roomsMin,
      areaMax,
      areaMin,
      status,
      currency,
      pets,
      furnished,
    } = filters;
    const { total } = await this._knexService.client
      .from('Apartments')
      .count('* as total')
      .first();

    const apartments: ApartmentsEntity[] = await this._knexService.client
      .select('*')
      .from('Apartments as ap')
      .modify((qb) => {
        if (searchText)
          qb.whereRaw('TRIM(ap.name) ILIKE ?', [`%${searchText}%`]);
        if (monthlyFeeMin) qb.where('ap.monthlyFee', '>=', monthlyFeeMin);
        if (monthlyFeeMax) qb.andWhere('ap.monthlyFee', '<=', monthlyFeeMax);

        if (roomsMin) qb.andWhere('ap.rooms', '>=', roomsMin);
        if (roomsMax) qb.andWhere('ap.rooms', '<=', roomsMax);

        if (areaMin) qb.andWhere('ap.area', '>=', areaMin);
        if (areaMax) qb.andWhere('ap.area', '<=', areaMax);

        if (status) qb.whereIn('ap.status', status.split(','));
        if (currency) qb.whereIn('ap.currency', currency.split(','));

        if (pets)
          qb.whereIn(
            'ap.pets',
            pets.split(',').map((i) => i === 'true'),
          );
        if (furnished)
          qb.whereIn(
            'ap.furnished',
            furnished.split(',').map((i) => i === 'true'),
          );
      })
      .orderBy('ap.createdAt', 'desc');
    return { apartments, total };
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
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
