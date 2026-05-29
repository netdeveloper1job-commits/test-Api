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
exports.WhatsappService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let WhatsappService = class WhatsappService {
    httpService;
    token = 'EAALggdQt0fwBRZA7YjZCvs2HL61nltTZARZCeyGRmw6ya2XfRKoIDsTXA9pl4BmZAprKnkr9A21HdxjceKKPqf6PhoRlvXMsU6RgzZCaZBT6HKxDD1vwXhAed9YpLhkdLkS5VulZATqpVtoThqF1ZCybM7Gq3pIjArnhFjWPnbjbmB1lRM1rruH2nacgqcZBceOU9Ygb8YZB1TiWQyQIMhElMNqjfbxVwBXmETLdUwOMeZBeExxuWyPy3gbIwF8y3W3P2vaZBBkXuIzzlsmt3iFvLKwuVaMPg';
    phoneNumberId = '1115754128286438';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async sendMessage(phone, templateName) {
        const url = `https://graph.facebook.com/v25.0/${this.phoneNumberId}/messages`;
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
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(url, payload, { headers }));
        return response.data;
    }
};
exports.WhatsappService = WhatsappService;
exports.WhatsappService = WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WhatsappService);
//# sourceMappingURL=whatsapp.service.js.map