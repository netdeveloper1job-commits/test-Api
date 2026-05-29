import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComplianceTrackerDto {
  @ApiProperty()
  locationId: number;

  @ApiProperty()
  complianceConfigId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty({ enum: ['Compliance', 'In Process', 'Overdue'] })
  status: string;

  @ApiProperty({ enum: ['Applied', 'Not Applied', 'Compliant'] })
  activity: string;

  @ApiPropertyOptional()
  doc?: string;

  @ApiPropertyOptional()
  complianceCompletionDate?: Date;

  @ApiPropertyOptional()
  complianceCertificate?: string;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  updatedBy?: string;
}
