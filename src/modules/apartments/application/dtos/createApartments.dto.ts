import { IsString } from 'class-validator';

export class CreateApartmentDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  address: string;

  @IsString()
  floor: string;
}
