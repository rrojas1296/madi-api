import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserEntity } from '../entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async findUserByEmail(email: string) {
    const user = await this._usersRepository.findByEmail(email);
    return user;
  }

  createUser(data: UserEntity) {
    return this._usersRepository.create(data);
  }
}
