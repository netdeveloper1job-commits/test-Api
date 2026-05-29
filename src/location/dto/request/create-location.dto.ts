import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  location: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  industryTypeId: string;
;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  updatedBy?: string;
}
