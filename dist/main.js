"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
require("./polyfill-crypto");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const body_parser_1 = require("body-parser");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const express = require('express');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const config = app.get(config_1.ConfigService);
    app.use((0, body_parser_1.json)({ limit: '50mb' }));
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use('/upload/', express.static((0, path_1.join)(__dirname, '..', '/upload')));
    app.use('/temp/', express.static((0, path_1.join)(__dirname, '..', 'temp')));
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
        origin: ['http://localhost:4200', 'https://cms.labsoft.in'],
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Compliance-Hub')
        .setDescription('The Compliance-Hub  API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Compliance-Hub')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(express.static('open-certs/issuers'));
    await app.listen(config.get('port') || 5000);
    console.log(`Application is running on: http://localhost:5000`);
}
bootstrap();
//# sourceMappingURL=main.js.map