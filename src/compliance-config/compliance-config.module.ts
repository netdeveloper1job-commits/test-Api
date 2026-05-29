import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceConfigController } from './compliance-config.controller';
import { ComplianceConfigService } from './compliance-config.service';
import { ComplianceConfig } from './entities/compliance-config.entity';
import { EventLogModule } from 'src/event-log/event-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceConfig]), EventLogModule],
  controllers: [ComplianceConfigController],
  providers: [ComplianceConfigService],
})
export class ComplianceConfigModule {}
