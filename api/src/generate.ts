import '../helpers/zod-openapi.init';

import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // DTOに定義されてないプロパティは削除される
  //     forbidNonWhitelisted: true, // DTOにないプロパティがあれば400エラー
  //     transform: true, // 値をDTOの型に変換（string → numberなど）
  //   }),
  // );
  app.useGlobalPipes(new ZodValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('andTopic API')
    .setDescription('andTopic API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  writeFileSync(
    './src/__generated__/openapi.json',
    JSON.stringify(document, null, 2),
  );
  // YAML 形式で書き出す
  const yamlDoc = yaml.dump(document);

  writeFileSync('./src/__generated__/openapi.yaml', yamlDoc, 'utf8');

  SwaggerModule.setup('api', app, document);

  await app.close();
}
bootstrap();
