import { HttpService } from '@nestjs/axios';
export declare class WhatsappService {
    private readonly httpService;
    private token;
    private phoneNumberId;
    constructor(httpService: HttpService);
    sendMessage(phone: string, templateName: string): Promise<any>;
}
