import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from '../dtos/createApartments.dto';

@Injectable()
export class CreateApartmentUseCase {
  execute(data: CreateApartmentDto) {
    console.log({ data });
  }
}
