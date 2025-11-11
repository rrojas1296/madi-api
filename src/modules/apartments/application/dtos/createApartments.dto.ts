import {
  ApartmentCondition,
  ApartmentCurrencies,
  ApartmentStatus,
} from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsInt,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsString()
  internalCode: string;

  @IsString()
  address: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  floor: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  area: number;

  @IsEnum(ApartmentStatus)
  status: ApartmentStatus;

  @IsOptional()
  @IsString()
  parking?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  persons: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  rooms: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Min(0)
  bathrooms: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  floors: number;

  @IsEnum(ApartmentCondition)
  condition: ApartmentCondition;

  @IsBoolean()
  @Type(() => Boolean)
  furnished: boolean;

  @IsBoolean()
  @Type(() => Boolean)
  pets: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  monthlyFee: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  garanty: number;

  @IsEnum(ApartmentCurrencies)
  currency: ApartmentCurrencies;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  maintenanceFee?: number;
}
