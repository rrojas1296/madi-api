import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/registerUser.useCase';
import { RegisterUserDto } from '../../application/dtos/registerUser.dto';
import { type Response } from 'express';
import { ValidateEmailUseCase } from '../../application/use-cases/validateRegisterEmail.useCase';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly _validateEmailUC: ValidateEmailUseCase,
    private readonly _registerUserUC: RegisterUserUseCase,
  ) {}

  @Post('validateEmail/:email')
  async validateEmail(@Param('email') email: string) {
    await this._validateEmailUC.execute(email);
    return {
      message: 'Email is free to use',
      status: HttpStatus.OK,
    };
  }

  @Post('registerUser')
  async registerUser(@Body() data: RegisterUserDto, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this._registerUserUC.execute(data);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });
    return res
      .json({
        message: 'User created successfully',
        status: HttpStatus.CREATED,
      })
      .status(HttpStatus.CREATED);
  }
}
