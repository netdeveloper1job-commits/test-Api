import { Repository } from 'typeorm';
import { ComplianceTracker } from './entities/compliance-tracker.entity';
import { MailService } from 'src/common/helper/mail/mail.service';
export declare class ReminderService {
    private trackerRepo;
    private readonly mailService;
    constructor(trackerRepo: Repository<ComplianceTracker>, mailService: MailService);
    sendDueDateReminders(): Promise<void>;
}
