import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersService } from './application/users.service';

@Module({
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
