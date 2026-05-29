import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { join } from 'path';

export const configuration = () => ({
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
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: 'developer@gmail.com',
    },
    template: {
      dir: join(process.cwd(), 'dist/common/helper/mail/templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  },
});
