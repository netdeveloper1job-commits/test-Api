import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceTrackerController } from './compliance-tracker.controller';
import { ComplianceTrackerService } from './compliance-tracker.service';
import { ComplianceTracker } from './entities/compliance-tracker.entity';
import { ReminderService } from './reminder.service';
import { MailService } from 'src/common/helper/mail/mail.service';
import { EventLogModule } from 'src/event-log/event-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceTracker]),EventLogModule],
  controllers: [ComplianceTrackerController],
  providers: [ComplianceTrackerService,ReminderService,MailService],
})
export class ComplianceTrackerModule {}
