import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComplianceConfigDto {
  @ApiProperty()
  industryTypeId: number;

  @ApiProperty()
  complianceCategoryId: number;

  @ApiProperty()
  complianceItem: string;

  @ApiProperty()
  riskCategory: string;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  updatedBy?: string;
}
