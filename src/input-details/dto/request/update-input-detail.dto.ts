import { PartialType } from '@nestjs/swagger';
import { CreateInputDetailDto } from './create-input-detail.dto';

export class UpdateInputDetailDto extends PartialType(CreateInputDetailDto) {}
