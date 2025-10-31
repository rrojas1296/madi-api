import { ApartmentsEntity } from '../entities/apartments.entity';

export interface IApartmentsRepository {
  create(data: ApartmentsEntity): Promise<string>;
}
