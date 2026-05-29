import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ComplianceCategoryResponse } from './compliance-category-response';

export class ComplianceCategoryWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'Compliance category operation completed successfully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: ComplianceCategoryResponse | ComplianceCategoryResponse[];

  constructor(
    message: string,
    data?: ComplianceCategoryResponse | ComplianceCategoryResponse[],
  ) {
    this.data = data;
    this.message = message;
  }
}
