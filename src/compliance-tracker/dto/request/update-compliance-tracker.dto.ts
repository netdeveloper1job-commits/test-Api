import { PartialType } from '@nestjs/swagger';
import { CreateComplianceTrackerDto } from './create-compliance-tracker.dto';

export class UpdateComplianceTrackerDto extends PartialType(
  CreateComplianceTrackerDto,
) {}
