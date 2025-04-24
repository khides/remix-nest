import '../helpers/zod-openapi.init';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'node:fs';
import * as yaml from 'js-yaml';
import { z } from 'zod';
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

  app.enableCors({
    origin: true, // フロントエンドのURL
    credentials: true, // 認証情報付きリクエストの場合（必要に応じて）
  });

  const config = new DocumentBuilder()
    .setTitle('andTopic API')
    .setDescription('andTopic API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // 任意: 説明用
        name: 'Authorization',
        in: 'header',
      },
      'supabase-auth', // この名前は後で使う
    )
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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
