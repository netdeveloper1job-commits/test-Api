import { MailerService } from '@nestjs-modules/mailer';
import { TemplateTypes } from './template-enums';
import { IMail } from './mail-interface';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendingMail(mailDto: IMail, templateTypes?: TemplateTypes): Promise<{
        statusCode: number;
        message: string;
    }>;
}
