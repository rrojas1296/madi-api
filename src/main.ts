import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000'],
    credentials: true,
  });
  app.use(cookieParser.default());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 80);
}
bootstrap();
