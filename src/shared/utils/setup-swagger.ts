import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
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

  SwaggerModule.setup('documentation', app, document);
}
