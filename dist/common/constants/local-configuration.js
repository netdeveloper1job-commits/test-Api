"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicConfig = exports.mailConfig = void 0;
const dbMySqlConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'compliance-hub',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
};
exports.default = () => ({
    port: 5000,
    database: dbMySqlConfig,
    front_url: 'http://localhost:4200',
});
exports.mailConfig = {
    host: 'smtp.gmail.com',
    username: 'mg2532179@gmail.com',
    password: 'pdppybayvetxgoic'
};
exports.basicConfig = {
    DB_TYPE: 'mysql',
    DB_PORT: '3306',
    DB_HOST: 'localhost',
    DB_USER: 'Developer_inspection',
    DB_PASSWORD: '',
    DB_NAME: 'Developer_inspection',
    SERVER_PORT: 3000,
    FRONT_URL: 'http://localhost:4200',
    FOLDER_PATH: 'http://localhost:5000',
    GOD_PASSWORD: 'msplisthebest',
    SUPERADMIN_EMAIL: 'admin@gmail.com',
    SUPERADMIN_PASSWORD: '123456@7',
};
//# sourceMappingURL=local-configuration.js.map