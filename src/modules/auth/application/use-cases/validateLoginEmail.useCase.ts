import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/application/users.service';

@Injectable()
export class ValidateLoginEmailUC {
  constructor(private readonly _usersService: UsersService) {}
  async execute(email: string) {
    const user = await this._usersService.findUserByEmail(email);
    if (!user)
      throw new HttpException('email_not_found', HttpStatus.UNAUTHORIZED);
  }
}
