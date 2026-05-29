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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const path = require('path');
let MailService = class MailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendingMail(mailDto, templateTypes) {
        try {
            const path = require('path');
            const fs = require('fs');
            const mailParameter = {
                to: mailDto.to,
                from: 'inspection',
                bcc: mailDto.cc || '',
                subject: mailDto.subject || '',
                attachments: [],
            };
            if (templateTypes) {
                mailParameter.template = templateTypes;
                mailParameter.context = { data: mailDto.data };
            }
            else {
                const fallbackText = mailDto.text || 'Please find the attached file.';
                mailParameter.text = fallbackText;
                mailParameter.html = `<p>${fallbackText}</p>`;
            }
            if (Array.isArray(mailDto.attachments)) {
                for (const attachment of mailDto.attachments) {
                    if (!attachment?.content) {
                        continue;
                    }
                    mailParameter.attachments.push({
                        filename: attachment.filename || 'attachment.pdf',
                        content: attachment.content,
                        contentType: attachment.contentType || 'application/pdf',
                    });
                }
            }
            else {
            }
            if (Array.isArray(mailDto.attachmentFilePath)) {
                for (const fileName of mailDto.attachmentFilePath) {
                    if (!fileName) {
                        continue;
                    }
                    const filePath = path.join(process.cwd(), 'upload', fileName);
                    if (!fs.existsSync(filePath)) {
                        continue;
                    }
                    mailParameter.attachments.push({
                        filename: fileName,
                        path: filePath,
                        contentType: 'application/pdf',
                    });
                }
            }
            else {
            }
            await this.mailerService.sendMail(mailParameter);
            return { statusCode: 200, message: 'Email sent successfully' };
        }
        catch (error) {
            console.error(' Error sending email:', error);
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map