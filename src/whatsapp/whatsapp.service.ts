import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsappService {
  private token = 'EAALggdQt0fwBRZA7YjZCvs2HL61nltTZARZCeyGRmw6ya2XfRKoIDsTXA9pl4BmZAprKnkr9A21HdxjceKKPqf6PhoRlvXMsU6RgzZCaZBT6HKxDD1vwXhAed9YpLhkdLkS5VulZATqpVtoThqF1ZCybM7Gq3pIjArnhFjWPnbjbmB1lRM1rruH2nacgqcZBceOU9Ygb8YZB1TiWQyQIMhElMNqjfbxVwBXmETLdUwOMeZBeExxuWyPy3gbIwF8y3W3P2vaZBBkXuIzzlsmt3iFvLKwuVaMPg';
  private phoneNumberId = '1115754128286438';

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(phone: string, templateName: string) {
    const url = `https://graph.facebook.com/v25.0/${this.phoneNumberId}/messages`; // Updated to v25.0 to match your curl

    const payload = {
      messaging_product: 'whatsapp',
      to: phone,
      type: 'template', 
      template: {
        name: templateName, 
        language: {
          code: 'en_US',
        },
      },
    };

  const headers = {
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  };

  const response = await firstValueFrom(
    this.httpService.post(url, payload, { headers }),
  );

  return response.data;
}
}