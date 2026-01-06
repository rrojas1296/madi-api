import { IsOptional, IsString } from 'class-validator';

export class FiltersTenantsTableDto {
  @IsString()
  @IsOptional()
  documentType: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsOptional()
  apartmentId: string;

  @IsString()
  @IsOptional()
  entryDateStart: string;

  @IsString()
  @IsOptional()
  entryDateEnd: string;

  @IsString()
  @IsOptional()
  paymentDayMin: string;

  @IsString()
  @IsOptional()
  paymentDayMax: string;
}
