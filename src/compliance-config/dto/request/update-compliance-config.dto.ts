import { PartialType } from '@nestjs/swagger';
import { CreateComplianceConfigDto } from './create-compliance-config.dto';

export class UpdateComplianceConfigDto extends PartialType(
  CreateComplianceConfigDto,
) {}
