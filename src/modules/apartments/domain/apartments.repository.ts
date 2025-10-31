import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ApartmentsEntity } from './entities/apartments.entity';

@Injectable()
export class ApartmentsRepository {
  constructor(private readonly _prismaService: PrismaService) {}
  async create(data: ApartmentsEntity) {
    const apartment = await this._prismaService.apartments.create({
      data,
    });
    return apartment.id;
  }
}
