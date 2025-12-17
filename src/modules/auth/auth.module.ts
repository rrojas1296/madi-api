import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { LoginController } from './controllers/login.controller';
import { AuthController } from './controllers/auth.controllers';
import { RegisterController } from './controllers/register.controller';
import { ValidateLoginEmailUseCase } from './use-cases/validateLoginEmail.useCase';
import { RegisterUserUseCase } from './use-cases/registerUser.useCase';
import { LoginUserUC } from './use-cases/loginUser.useCase';
import { JwtService } from './services/jwt.service';
import { BcryptService } from './services/bcrypt.service';
import { ValidateRegisterEmailUseCase } from './use-cases/validateRegisterEmail.useCase';

@Module({
  controllers: [RegisterController, AuthController, LoginController],
  providers: [
    ValidateRegisterEmailUseCase,
    ValidateLoginEmailUseCase,
    RegisterUserUseCase,
    LoginUserUC,
    JwtService,
    BcryptService,
  ],
  imports: [UsersModule],
})
export class AuthModule {}
