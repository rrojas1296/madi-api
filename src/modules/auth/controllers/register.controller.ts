import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CookieOptions, type Response } from 'express';
import { ValidateLoginEmailUseCase } from '../use-cases/validateLoginEmail.useCase';
import { RegisterUserUseCase } from '../use-cases/registerUser.useCase';
import { RegisterUserDto } from '../dtos/registerUser.dto';
import { ValidateRegisterEmailUseCase } from '../use-cases/validateRegisterEmail.useCase';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly _validateRegisterEmailUC: ValidateRegisterEmailUseCase,
    private readonly _registerUserUC: RegisterUserUseCase,
  ) {}

  @Post('validateEmail/:email')
  async validateEmail(@Param('email') email: string) {
    await this._validateRegisterEmailUC.execute(email);
    return {
      message: 'Email is free to use',
      status: HttpStatus.OK,
    };
  }

  @Post('registerUser')
  async registerUser(@Body() data: RegisterUserDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this._registerUserUC.execute(data);

    const cookieBaseConfig: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    };
    res.cookie('accessToken', accessToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 10 * 60 * 60,
    });
    res.cookie('refreshToken', refreshToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return res
      .json({
        message: 'User created successfully',
        status: HttpStatus.CREATED,
      })
      .status(HttpStatus.CREATED);
  }
}
