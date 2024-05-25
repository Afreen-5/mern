import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();
