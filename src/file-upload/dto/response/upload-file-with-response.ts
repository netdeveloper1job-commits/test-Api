import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UploadFileResponse } from './upload-file-response';

export class UploadFileWithResponse {
  @ApiProperty({
    title: 'Message',
    description: 'File upload success message',
    example: 'File uploaded successfully',
  })
  @Expose()
  message: string;

  @ApiProperty({
    title: 'Data',
    description: 'Uploaded file details',
    type: UploadFileResponse,
  })
  @Expose()
  data: UploadFileResponse;

  constructor(message: string, data: UploadFileResponse) {
    this.message = message;
    this.data = data;
  }
}
