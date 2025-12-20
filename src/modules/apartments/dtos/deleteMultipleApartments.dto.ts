import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class DeleteMultipleApartmentsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
