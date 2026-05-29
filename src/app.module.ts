import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { configuration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { LocationModule } from './location/location.module';
import { InputDetailsModule } from './input-details/input-details.module';
import { ComplianceCategoryModule } from './compliance-category/compliance-category.module';
import { ComplianceConfigModule } from './compliance-config/compliance-config.module';
import { ComplianceTrackerModule } from './compliance-tracker/compliance-tracker.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { existsSync } from 'fs';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { AuditLogModule } from './audit-log/audit-log.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { EventLogModule } from './event-log/event-log.module';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFileCandidates = [
  join(__dirname, 'config', `${nodeEnv}.env`),
  join(process.cwd(), 'dist', 'config', `${nodeEnv}.env`),
  join(process.cwd(), 'src', 'config', `${nodeEnv}.env`),
];

const resolvedEnvFilePath =
  envFileCandidates.find((filePath) => existsSync(filePath)) ??
  envFileCandidates[0];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolvedEnvFilePath,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // useFactory: (config: ConfigService) => config.get('database')!,
      useFactory: (config: ConfigService) => {
    const dbConfig = config.get('database');

    // console.log(' Database Config:', dbConfig);
    // console.log(' NODE_ENV:', process.env.NODE_ENV);

    return dbConfig!;
  },
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('mail')!,
      inject: [ConfigService],
    }),
    
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    LocationModule,
    InputDetailsModule,
    ComplianceCategoryModule,
    FileUploadModule,
    ComplianceConfigModule,
    ComplianceTrackerModule,
    AuditLogModule,
    WhatsappModule,
    EventLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
