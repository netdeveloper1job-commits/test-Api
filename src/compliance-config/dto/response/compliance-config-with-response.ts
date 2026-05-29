import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ComplianceConfigResponse } from './compliance-config-response';

export class ComplianceConfigWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'Compliance config operation completed successfully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: ComplianceConfigResponse | ComplianceConfigResponse[];

  constructor(
    message: string,
    data?: ComplianceConfigResponse | ComplianceConfigResponse[],
  ) {
    this.data = data;
    this.message = message;
  }
}
