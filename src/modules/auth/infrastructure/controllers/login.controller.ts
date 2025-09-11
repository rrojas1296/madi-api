import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { LoginUserDto } from '../../application/dtos/loginUser.dto';
import { LoginUserUC } from '../../application/use-cases/loginUser.useCase';
import { CookieOptions, type Response } from 'express';
import { ValidateLoginEmailUC } from '../../application/use-cases/validateLoginEmail.useCase';

@Controller('login')
export class LoginController {
  constructor(
    private readonly _loginUserUseCase: LoginUserUC,
    private readonly _validateLoginEmail: ValidateLoginEmailUC,
  ) {}
  @Post('')
  async loginUser(@Body() data: LoginUserDto, @Res() res: Response) {
    const tokens = await this._loginUserUseCase.execute(data);
    const cookieBaseConfig: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };
    res.cookie('accessToken', tokens.accessToken, {
      ...cookieBaseConfig,
      maxAge: 1000 * 10,
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
    console.log({ email });
    await this._validateLoginEmail.execute(email);
    return {
      message: 'Email is registered',
      status: HttpStatus.OK,
    };
  }
}
