import { UserEntity } from '../entities/users.entity';

export interface IUsersRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(data: UserEntity): Promise<string>;
}
