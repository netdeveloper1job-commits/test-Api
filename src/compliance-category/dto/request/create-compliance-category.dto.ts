import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComplianceCategoryDto {
  @ApiProperty()
  industryTypeId: number;

  @ApiProperty()
  complianceCategoryName: string;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  updatedBy?: string;
}
