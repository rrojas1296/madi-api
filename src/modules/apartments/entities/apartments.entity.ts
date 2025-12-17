import {
  ApartmentCondition,
  ApartmentCurrencies,
  ApartmentStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface ApartmentsProps {
  id?: string;
  name: string;
  internalCode: string;
  address: string;
  floor: number;
  area: number | Decimal;
  status: ApartmentStatus;
  parking?: string | null;
  persons: number;
  rooms: number;
  bathrooms: number;
  floors: number;
  condition: ApartmentCondition;
  furnished: boolean;
  pets: boolean;
  monthlyFee: number | Decimal;
  garanty: number | Decimal;
  currency: ApartmentCurrencies;
  maintenanceFee?: number | null | Decimal;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
export class ApartmentsEntity {
  constructor(private readonly props: ApartmentsProps) {}

  toJSON() {
    return this.props;
  }
}
