import {
  ApartmentCondition,
  ApartmentCurrencies,
  ApartmentStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface Props {
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

  constructor({
    id,
    name,
    internalCode,
    address,
    floor,
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
    createdAt,
    updatedAt,
  }: Props) {
    this.id = id;
    this.name = name;
    this.internalCode = internalCode;
    this.address = address;
    this.floor = floor;
    this.area = area;
    this.status = status;
    this.parking = parking;
    this.persons = persons;
    this.rooms = rooms;
    this.bathrooms = bathrooms;
    this.floors = floors;
    this.condition = condition;
    this.furnished = furnished;
    this.pets = pets;
    this.monthlyFee = monthlyFee;
    this.garanty = garanty;
    this.currency = currency;
    this.maintenanceFee = maintenanceFee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
