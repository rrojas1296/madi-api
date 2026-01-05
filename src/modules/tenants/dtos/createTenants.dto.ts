import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import { DocumentType, Nationality } from '@prisma/client';

export class CreateTenantDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @MinLength(1)
  primaryPhone: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @IsEmail()
  email: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  @MinLength(1)
  numberDocument: string;

  @IsEnum(Nationality)
  nationality: Nationality;

  @IsString()
  birthDate: string; // ISO string → mapped to Date in service

  @IsString()
  entryDate: string; // ISO string → mapped to Date in service

  @IsOptional()
  @IsString()
  outDate?: string; // ISO string → mapped to Date in service

  @IsUUID()
  apartmentId: string;

  @IsInt()
  @Min(1)
  @Max(31)
  paymentDay: number;
}
