"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const configuration_1 = require("./config/configuration");
const typeorm_1 = require("@nestjs/typeorm");
const mailer_1 = require("@nestjs-modules/mailer");
const location_module_1 = require("./location/location.module");
const input_details_module_1 = require("./input-details/input-details.module");
const compliance_category_module_1 = require("./compliance-category/compliance-category.module");
const compliance_config_module_1 = require("./compliance-config/compliance-config.module");
const compliance_tracker_module_1 = require("./compliance-tracker/compliance-tracker.module");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const fs_1 = require("fs");
const path_1 = require("path");
const schedule_1 = require("@nestjs/schedule");
const audit_log_module_1 = require("./audit-log/audit-log.module");
const whatsapp_module_1 = require("./whatsapp/whatsapp.module");
const event_log_module_1 = require("./event-log/event-log.module");
const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFileCandidates = [
    (0, path_1.join)(__dirname, 'config', `${nodeEnv}.env`),
    (0, path_1.join)(process.cwd(), 'dist', 'config', `${nodeEnv}.env`),
    (0, path_1.join)(process.cwd(), 'src', 'config', `${nodeEnv}.env`),
];
const resolvedEnvFilePath = envFileCandidates.find((filePath) => (0, fs_1.existsSync)(filePath)) ??
    envFileCandidates[0];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: resolvedEnvFilePath,
                load: [configuration_1.configuration],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => {
                    const dbConfig = config.get('database');
                    return dbConfig;
                },
                inject: [config_1.ConfigService],
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => config.get('mail'),
                inject: [config_1.ConfigService],
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            location_module_1.LocationModule,
            input_details_module_1.InputDetailsModule,
            compliance_category_module_1.ComplianceCategoryModule,
            file_upload_module_1.FileUploadModule,
            compliance_config_module_1.ComplianceConfigModule,
            compliance_tracker_module_1.ComplianceTrackerModule,
            audit_log_module_1.AuditLogModule,
            whatsapp_module_1.WhatsappModule,
            event_log_module_1.EventLogModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map