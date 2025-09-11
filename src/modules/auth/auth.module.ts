import { Module } from '@nestjs/common';
import { RegisterController } from './infrastructure/controllers/register.controller';
import { UsersModule } from '../users/users.module';
import { RegisterUserUseCase } from './application/use-cases/registerUser.useCase';
import { JwtService } from './infrastructure/services/jwt.service';
import { BcryptService } from './infrastructure/services/bcrypt.service';
import { AuthController } from './infrastructure/controllers/auth.controllers';
import { ValidateEmailUseCase as ValidateRegisterEmailUC } from './application/use-cases/validateRegisterEmail.useCase';
import { LoginController } from './infrastructure/controllers/login.controller';
import { ValidateLoginEmailUC } from './application/use-cases/validateLoginEmail.useCase';
import { LoginUserUC } from './application/use-cases/loginUser.useCase';

@Module({
  controllers: [RegisterController, AuthController, LoginController],
  providers: [
    ValidateRegisterEmailUC,
    ValidateLoginEmailUC,
    RegisterUserUseCase,
    LoginUserUC,
    JwtService,
    BcryptService,
  ],
  imports: [UsersModule],
})
export class AuthModule {}
