import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Yoda Pay')
    .setDescription('REST API for Yoda Pay')
    .setVersion('1.0')
    .setLicense('MIT', 'https://mit-license.org/')
    .setContact(
      'Wellici Araujo',
      'https://github.com/wdev007',
      'wja1@ifal.edu.br',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get('APP_PORT');

  await app.listen(PORT);

  logger.log(`application is running in PORT: ${PORT}`);
}
bootstrap();
