import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AccountDto } from '../../modules/accounts/dto';

export function setupSwagger(app: INestApplication, apiUrl: string) {
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
    .addServer(apiUrl, 'Yoda Pay API url')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [AccountDto],
  });

  SwaggerModule.setup('documentation', app, document);
}
