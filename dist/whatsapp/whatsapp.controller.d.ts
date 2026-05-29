import { WhatsappService } from './whatsapp.service';
import { SendWhatsappDto } from './dto/create-whatsapp.dto';
export declare class WhatsappController {
    private readonly whatsappService;
    constructor(whatsappService: WhatsappService);
    sendMessage(dto: SendWhatsappDto): Promise<any>;
}
