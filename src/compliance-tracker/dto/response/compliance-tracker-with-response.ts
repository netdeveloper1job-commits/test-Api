import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ComplianceTrackerResponse } from './compliance-tracker-response';

export class ComplianceTrackerWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'Compliance tracker operation completed successfully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: ComplianceTrackerResponse | ComplianceTrackerResponse[];

  constructor(
    message: string,
    data?: ComplianceTrackerResponse | ComplianceTrackerResponse[],
  ) {
    this.data = data;
    this.message = message;
  }
}
