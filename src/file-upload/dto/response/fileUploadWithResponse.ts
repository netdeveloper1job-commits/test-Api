import { ApiProperty } from "@nestjs/swagger";

import { Expose } from "class-transformer";
import { FileUploadResponse } from "./file-upload-response";


export class FileUploadWithResponse{
    @ApiProperty({
        title: 'Message',
        description: 'File Upload Created Success fully',
        example: 'Process Successful',
      })

      @Expose()
      message: string;

      @ApiProperty({
        title: 'Data',
        description: 'Specifies response data',
      })
      
      @Expose()
      data?: FileUploadResponse| FileUploadResponse[];

      constructor(message: string, data: FileUploadResponse | FileUploadResponse[]) {
        this.data = data;
        this.message = message;
      }
}