import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
declare const _default: () => {
    port: number;
    database: MysqlConnectionOptions;
    front_url: string;
};
export default _default;
export declare const mailConfig: {
    host: string;
    username: string;
    password: string;
};
export declare const basicConfig: {
    DB_TYPE: string;
    DB_PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    SERVER_PORT: number;
    FRONT_URL: string;
    FOLDER_PATH: string;
    GOD_PASSWORD: string;
    SUPERADMIN_EMAIL: string;
    SUPERADMIN_PASSWORD: string;
};
