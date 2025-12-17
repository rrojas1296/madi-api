import { IsOptional, IsString } from 'class-validator';

export class FiltersDataTableDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  currency: string;

  @IsString()
  @IsOptional()
  monthlyFeeMin: string;

  @IsString()
  @IsOptional()
  monthlyFeeMax: string;

  @IsString()
  @IsOptional()
  roomsMin: string;

  @IsString()
  @IsOptional()
  roomsMax: string;

  @IsString()
  @IsOptional()
  areaMin: string;

  @IsString()
  @IsOptional()
  areaMax: string;

  @IsString()
  @IsOptional()
  pets: string;

  @IsString()
  @IsOptional()
  furnished: string;
}
