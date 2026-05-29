import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadFileResponse {
  @ApiProperty()
  @Expose()
  filePath: string;

  @ApiProperty()
  @Expose()
  actualFileName: string;
}
