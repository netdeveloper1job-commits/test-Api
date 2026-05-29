import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EventLogResponse } from './event-log.response';

export class EventLogWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'Application Test Created Success fully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: EventLogResponse | EventLogResponse[];

  constructor(
    message: string,
    data: EventLogResponse | EventLogResponse[],
  ) {
    this.data = data;
    this.message = message;
  }
}
