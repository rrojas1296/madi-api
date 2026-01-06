import { IsNumber, IsString } from 'class-validator';

export class GetTenantsTableDto {
  @IsString()
  search: string;

  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;
}
