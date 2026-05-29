"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceTrackerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const compliance_tracker_controller_1 = require("./compliance-tracker.controller");
const compliance_tracker_service_1 = require("./compliance-tracker.service");
const compliance_tracker_entity_1 = require("./entities/compliance-tracker.entity");
const reminder_service_1 = require("./reminder.service");
const mail_service_1 = require("../common/helper/mail/mail.service");
const event_log_module_1 = require("../event-log/event-log.module");
let ComplianceTrackerModule = class ComplianceTrackerModule {
};
exports.ComplianceTrackerModule = ComplianceTrackerModule;
exports.ComplianceTrackerModule = ComplianceTrackerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([compliance_tracker_entity_1.ComplianceTracker]), event_log_module_1.EventLogModule],
        controllers: [compliance_tracker_controller_1.ComplianceTrackerController],
        providers: [compliance_tracker_service_1.ComplianceTrackerService, reminder_service_1.ReminderService, mail_service_1.MailService],
    })
], ComplianceTrackerModule);
//# sourceMappingURL=compliance-tracker.module.js.map