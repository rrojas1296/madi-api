import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CookieOptions, type Response } from 'express';
import { LoginUserUC } from '../use-cases/loginUser.useCase';
import { ValidateLoginEmailUseCase } from '../use-cases/validateLoginEmail.useCase';
import { LoginUserDto } from '../dtos/loginUser.dto';

@Controller('login')
export class LoginController {
  constructor(
    private readonly _loginUserUseCase: LoginUserUC,
    private readonly _validateLoginEmail: ValidateLoginEmailUseCase,
  ) {}
  @Post('')
  async loginUser(@Body() data: LoginUserDto, @Res() res: Response) {
    const tokens = await this._loginUserUseCase.execute(data);
    const cookieBaseConfig: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    };
    res.cookie('accessToken', tokens.accessToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 10 * 60 * 60,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return res
      .json({ status: HttpStatus.OK, message: 'User logged successfully' })
      .status(HttpStatus.OK);
  }

  @Post('validateEmail/:email')
  async validateEmail(@Param('email') email: string) {
    await this._validateLoginEmail.execute(email);
    return {
      message: 'Email is registered',
      status: HttpStatus.OK,
    };
  }
}
