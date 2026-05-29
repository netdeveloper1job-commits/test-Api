import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { TransformDateToEpoch } from "src/common/helper/decorators/transformDateToEpoch";
import { FileUploadEnum } from "src/file-upload/entities/file-upload";
import { PrimaryGeneratedColumn } from "typeorm";

export class FileUploadResponse{
    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    schedulingId: number;

    @ApiProperty({ example: FileUploadEnum })
    @Expose()
    fileType: FileUploadEnum;

    @ApiProperty()
    @Expose()
    actualFileName: string;

    @ApiProperty()
    @Expose()
    filePath: string;

    @ApiProperty()
    @Expose()
    status: string;

    @ApiPropertyOptional({ example: Date.now() / 1000 })
    @TransformDateToEpoch()
    @Expose()
    createdDate?: Date;

    @ApiProperty()
    @Expose()
    createdBy: string;

    @ApiPropertyOptional({ example: Date.now() / 1000 })
    @TransformDateToEpoch()
    @Expose()
    updatedDate: Date;

    @ApiProperty()
    @Expose()
    updatedBy: string;
}