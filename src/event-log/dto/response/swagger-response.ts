import { ApiProperty } from '@nestjs/swagger';
import { EventLogResponse } from './event-log.response';

export class EventLogResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({type: EventLogResponse, isArray: true})
  data: EventLogResponse[];
}