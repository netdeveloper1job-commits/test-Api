import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInputDetailDto {
  @ApiProperty()
  attributeType: string;

  @ApiProperty()
  attributeName: string;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  updatedBy?: string;
}
