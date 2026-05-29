import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TemplateTypes } from './template-enums';
import { IMail } from './mail-interface';

const path = require('path');

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  // async sendingMail(mailDto: IMail, templateTypes?: TemplateTypes) {
  // try {
  //     let mailParameter = {
  //       to: mailDto.to, // list of receivers
  //       from: 'inspection', // sender address
  //       /// cc: EmailFields.reply_cc,
  //       bcc: '',
  //       subject: mailDto.subject, // Subject line
  //       template: `${templateTypes}`,
  //       context: {
  //         // data: '<img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg" alt="xyz">',
  //         data:mailDto.data,
  //       },
  //       // html: `${mailDto.data}`
  //     };

  //     await this.mailerService.sendMail(mailParameter);
  //     return {
  //       statusCode: 200,
  //       message: 'Email sent successfully',
  //     };
  //   } catch (error) {
  //     if (error.status === 404) {
  //       throw new NotFoundException();
  //     }
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

  // mail.service.ts
// mail.service.ts
// mail.service.ts
// mail.service.ts
async sendingMail(mailDto: IMail, templateTypes?: TemplateTypes) {
  try {
    const path = require('path');
    const fs = require('fs');

    const mailParameter: any = {
      to: mailDto.to,
      from: 'inspection',
      bcc: mailDto.cc || '',
      subject: mailDto.subject || '',
      attachments: [],
    };

    // Template or fallback
    if (templateTypes) {
      mailParameter.template = templateTypes;
      mailParameter.context = { data: mailDto.data };
    } else {
      const fallbackText = mailDto.text || 'Please find the attached file.';
      mailParameter.text = fallbackText;
      mailParameter.html = `<p>${fallbackText}</p>`;
    
    }
  //   buffer based file data
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
    } else {
    
    }
  //   file based
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
    } else {
    
    }

    
    await this.mailerService.sendMail(mailParameter);
    return { statusCode: 200, message: 'Email sent successfully' };

  } catch (error) {
    console.error(' Error sending email:', error);
    throw new InternalServerErrorException(error.message);
  }
}




}
