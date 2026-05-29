"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/adapters/handlebars.adapter");
const path_1 = require("path");
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database: {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
    },
    mail: {
        transport: {
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT ?? '465', 10),
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        },
        defaults: {
            from: 'developer@gmail.com',
        },
        template: {
            dir: (0, path_1.join)(process.cwd(), 'dist/common/helper/mail/templates'),
            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    },
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map