import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { InputDetailResponse } from './input-detail-response';

export class InputDetailWithResponse {
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
  data?: InputDetailResponse | InputDetailResponse[];

  constructor(
    message: string,
    data?: InputDetailResponse | InputDetailResponse[],
  ) {
    this.data = data;
    this.message = message;
  }
}
