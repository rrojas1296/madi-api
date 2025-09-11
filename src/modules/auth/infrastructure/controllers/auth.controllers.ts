import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { RefreshTokenDto } from '../../application/dtos/refreshToken.dto';
import { CookieOptions, type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly _jwtService: JwtService) {}

  @Post('refreshToken')
  async refreshToken(@Body() data: RefreshTokenDto) {
    const payload = await this._jwtService.verify(
      data.refreshToken,
      'refreshToken',
    );
    const { accessToken } = await this._jwtService.generateTokens(payload);
    return { accessToken };
  }

  @Get('signout')
  signOut(@Res() res: Response) {
    const cookieBaseConfig: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };
    res.clearCookie('accessToken', {
      ...cookieBaseConfig,
      maxAge: 1000 * 10,
    });
    res.clearCookie('refreshToken', {
      ...cookieBaseConfig,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return res
      .json({ message: 'User loggedout successfully', status: 200 })
      .status(HttpStatus.OK);
  }
}
