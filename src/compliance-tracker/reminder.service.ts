import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComplianceTracker } from './entities/compliance-tracker.entity';
import { MailService } from 'src/common/helper/mail/mail.service';
import { TemplateTypes } from 'src/common/helper/mail/template-enums';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(ComplianceTracker)
    private trackerRepo: Repository<ComplianceTracker>,
    private readonly mailService: MailService,
  ) {}

 @Cron('30 9 * * *', {
  timeZone: 'Asia/Kolkata',
})
  async sendDueDateReminders() {
    console.log('==============================');
    console.log('🚀 CRON STARTED: Compliance Reminder Job');
    console.log('🕒 Current Time:', new Date().toISOString());

    const today = new Date();
    console.log('📅 Today:', today.toISOString());

    const targetDate = new Date();
    targetDate.setDate(today.getDate() + 30);

    console.log('🎯 Target Date (today + 30 days):', targetDate.toISOString());

    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(targetDate);
    end.setHours(23, 59, 59, 999);

    console.log('📌 Query Range Start:', start.toISOString());
    console.log('📌 Query Range End:', end.toISOString());

    const trackers = await this.trackerRepo
      .createQueryBuilder('tracker')
      .leftJoinAndSelect('tracker.user', 'user')
      .leftJoinAndSelect('tracker.complianceConfig', 'complianceConfig')
      .where('tracker.dueDate BETWEEN :start AND :end', { start, end })
      .andWhere('tracker.reminderSent = false')
      .getMany();

    console.log(`🔎 Found ${trackers.length} trackers to process`);

    for (const tracker of trackers) {
      console.log('------------------------------');
      console.log('📄 Processing Tracker ID:', tracker.id);
      console.log('👤 User:', tracker.user?.emailId);
      console.log('📆 Due Date:', tracker.dueDate);

      if (!tracker.user?.emailId) {
        console.log('⚠️ Skipped: No email found for user');
        continue;
      }

      try {
        console.log('📧 Sending email...');

       await this.mailService.sendingMail(
        {
            to: tracker.user.emailId,
            subject: 'Compliance Reminder',
            data: {
            name: tracker.user.name,
            dueDate: tracker.dueDate,
            complianceItem: tracker.complianceConfig.complianceItem
            },
        },
        TemplateTypes.complianceRemainder,
        );
        console.log('✅ Email sent successfully');

        await this.trackerRepo.update(tracker.id, {
          reminderSent: true,
        });

        console.log('📝 Marked reminderSent = true');
      } catch (error) {
        console.error('❌ Error sending email for tracker:', tracker.id);
        console.error(error);
      }
    }

    console.log('🏁 CRON FINISHED');
    console.log('==============================');
  }
}