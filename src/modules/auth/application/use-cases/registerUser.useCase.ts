import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/application/users.service';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { UserEntity } from 'src/modules/users/domain/users.entity';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { JwtService } from '../../infrastructure/services/jwt.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _bcryptService: BcryptService,
    private readonly _jwtService: JwtService,
  ) {}

  async execute(data: RegisterUserDto) {
    const hashed = await this._bcryptService.hash(data.password);
    const newUser = new UserEntity({ email: data.email, password: hashed });
    const userDB = await this._usersService.findUserByEmail(data.email);
    if (userDB)
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    const id = await this._usersService.createUser(newUser);
    return this._jwtService.generateTokens({
      email: newUser.email,
      sub: id,
    });
  }
}
