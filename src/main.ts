import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loadApiSpec } from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const apiSpec = loadApiSpec();

  const config = new DocumentBuilder()
    .setTitle(apiSpec.info.title)
    .setDescription(apiSpec.info.description)
    .setVersion(apiSpec.info.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  Object.assign(document, {
    components: apiSpec.components,
    paths: apiSpec.paths,
  });

  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(4000);
}
bootstrap();
