import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { UsersService } from 'src/modules/users/application/users.service';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { JwtService } from '../../infrastructure/services/jwt.service';

@Injectable()
export class LoginUserUC {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _bcryptService: BcryptService,
    private readonly _jwtService: JwtService,
  ) {}
  async execute(data: LoginUserDto) {
    const userDB = await this._usersService.findUserByEmail(data.email);
    if (!userDB)
      throw new HttpException('email_not_found', HttpStatus.UNAUTHORIZED);
    const match = await this._bcryptService.verifyPassword(
      data.password,
      userDB.password,
    );
    if (!match)
      throw new HttpException('incorrect_password', HttpStatus.UNAUTHORIZED);

    const tokens = await this._jwtService.generateTokens({
      email: userDB.email,
      sub: userDB.id!,
    });
    return tokens;
  }
}
