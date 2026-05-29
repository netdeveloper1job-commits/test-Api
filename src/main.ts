// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import './polyfill-crypto';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
const express = require('express');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const config = app.get(ConfigService);
  app.use(json({limit: '50mb'}));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use('/upload/', express.static(join(__dirname, '..', '/upload')));
  app.use('/temp/', express.static(join(__dirname, '..', 'temp')));
  app.use("/static", express.static('./static/'));
  app.enableCors({
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
      'Accept-Encoding',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    origin: ['http://localhost:4200' , 'https://cms.labsoft.in'],
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Compliance-Hub')
    .setDescription('The Compliance-Hub  API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Compliance-Hub')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.use(express.static('open-certs/issuers'));
  await app.listen(config.get<number>('port') || 5000);
  console.log(`Application is running on: http://localhost:5000`);
}
bootstrap();
