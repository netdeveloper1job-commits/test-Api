import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
export declare const configuration: () => {
    NODE_ENV: string | undefined;
    port: string | undefined;
    database: {
        type: string;
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        entities: string[];
        synchronize: boolean;
    };
    mail: {
        transport: {
            host: string | undefined;
            port: number;
            secure: boolean;
            auth: {
                user: string | undefined;
                pass: string | undefined;
            };
        };
        defaults: {
            from: string;
        };
        template: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
    };
};
