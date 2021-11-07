import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception/http-exception.filter';
import { setupSwagger } from './shared/utils';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

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
