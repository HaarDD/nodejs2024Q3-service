import { NestFactory } from '@nestjs/core';
import { AppModule } from './common/module/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './common/swagger/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  setupSwagger(app);

  const port = configService.get<number>('PORT', 4000);

  await app.listen(port);
}
bootstrap();
