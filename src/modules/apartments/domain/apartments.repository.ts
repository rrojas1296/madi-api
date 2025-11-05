import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ApartmentsEntity } from './entities/apartments.entity';
import { IApartmentsRepository } from './interfaces/apartmentsRepository.interface';

@Injectable()
export class ApartmentsRepository implements IApartmentsRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: ApartmentsEntity): Promise<string> {
    const apartment = await this._prismaService.apartments.create({
      data,
    });
    return apartment.id;
  }
}
