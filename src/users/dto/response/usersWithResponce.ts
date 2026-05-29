import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserResponse } from './users-response';

export class UserWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'User operation completed successfully',
    example: 'Process Successful',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Specifies response data',
  })
  @Expose()
  data?: UserResponse | UserResponse[];

  constructor(message: string, data?: UserResponse | UserResponse[]) {
    this.data = data;
    this.message = message;
  }
}
