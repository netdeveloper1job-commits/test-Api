import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuditLogResponse } from './audit-log-response';


export class AuditLogWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'Input detail operation completed successfully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: AuditLogResponse | AuditLogResponse[];

  constructor(
    message: string,
    data?: AuditLogResponse | AuditLogResponse[],
  ) {
    this.data = data;
    this.message = message;
  }
}
