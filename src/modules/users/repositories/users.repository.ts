import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/usersRepository.interface';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserEntity } from '../entities/users.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly _prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDB = await this._prismaService.users.findFirst({
      where: {
        email,
      },
    });
    if (!userDB) return null;
    return new UserEntity(userDB);
  }

  async create(data: UserEntity): Promise<string> {
    const user = await this._prismaService.users.create({
      data,
    });
    return user.id;
  }
}
