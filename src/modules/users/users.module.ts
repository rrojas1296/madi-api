import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
