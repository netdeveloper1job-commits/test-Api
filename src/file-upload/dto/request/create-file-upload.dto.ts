import { ApiProperty } from "@nestjs/swagger";
import { FileUploadEnum } from "src/file-upload/entities/file-upload";
export class CreateFileUploadDto {

    @ApiProperty()
    schedulingId: number;

    @ApiProperty({ default: FileUploadEnum.SAMPLE })
    fileType: FileUploadEnum;

    @ApiProperty()
    actualFileName: string;

    @ApiProperty()
    filePath: string;

    @ApiProperty()
    status: string;
}
