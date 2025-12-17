import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class ValidateRegisterEmailUseCase {
  constructor(private readonly _usersService: UsersService) {}
  async execute(email: string) {
    const user = await this._usersService.findUserByEmail(email);
    if (user) throw new HttpException('email_in_use', HttpStatus.BAD_REQUEST);
  }
}
