import { IsNumber, IsString } from 'class-validator';

export class GetApartmentsTableDto {
  @IsString()
  search: string;

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
