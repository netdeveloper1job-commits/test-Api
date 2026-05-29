import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { LocationResponse } from './location-response';

export class LocationWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'Location operation completed successfully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: LocationResponse | LocationResponse[];

  constructor(message: string, data?: LocationResponse | LocationResponse[]) {
    this.data = data;
    this.message = message;
  }
}
