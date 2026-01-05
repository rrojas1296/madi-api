import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { jwtVerify } from 'jose';
import { Request } from 'express';
import { JWT_ACCESS_SECRET } from 'src/config/jwt.config';

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies?.accessToken as string;

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const secret = new TextEncoder().encode(JWT_ACCESS_SECRET);

      const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'],
      });

      req['user'] = {
        id: payload.sub,
        email: payload.email,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
