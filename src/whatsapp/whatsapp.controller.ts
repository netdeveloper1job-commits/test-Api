import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SendWhatsappDto } from './dto/create-whatsapp.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('whatsapp')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class WhatsappController {
constructor(private readonly whatsappService: WhatsappService) {}

@Post('send')
sendMessage(@Body() dto: SendWhatsappDto) {
  return this.whatsappService.sendMessage(dto.phone, dto.message);
}
}
