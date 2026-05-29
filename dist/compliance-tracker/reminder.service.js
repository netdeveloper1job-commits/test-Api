"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const compliance_tracker_entity_1 = require("./entities/compliance-tracker.entity");
const mail_service_1 = require("../common/helper/mail/mail.service");
const template_enums_1 = require("../common/helper/mail/template-enums");
let ReminderService = class ReminderService {
    trackerRepo;
    mailService;
    constructor(trackerRepo, mailService) {
        this.trackerRepo = trackerRepo;
        this.mailService = mailService;
    }
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
                await this.mailService.sendingMail({
                    to: tracker.user.emailId,
                    subject: 'Compliance Reminder',
                    data: {
                        name: tracker.user.name,
                        dueDate: tracker.dueDate,
                        complianceItem: tracker.complianceConfig.complianceItem
                    },
                }, template_enums_1.TemplateTypes.complianceRemainder);
                console.log('✅ Email sent successfully');
                await this.trackerRepo.update(tracker.id, {
                    reminderSent: true,
                });
                console.log('📝 Marked reminderSent = true');
            }
            catch (error) {
                console.error('❌ Error sending email for tracker:', tracker.id);
                console.error(error);
            }
        }
        console.log('🏁 CRON FINISHED');
        console.log('==============================');
    }
};
exports.ReminderService = ReminderService;
__decorate([
    (0, schedule_1.Cron)('30 9 * * *', {
        timeZone: 'Asia/Kolkata',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReminderService.prototype, "sendDueDateReminders", null);
exports.ReminderService = ReminderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compliance_tracker_entity_1.ComplianceTracker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], ReminderService);
//# sourceMappingURL=reminder.service.js.map