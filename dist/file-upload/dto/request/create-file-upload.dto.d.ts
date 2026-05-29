import { FileUploadEnum } from "src/file-upload/entities/file-upload";
export declare class CreateFileUploadDto {
    schedulingId: number;
    fileType: FileUploadEnum;
    actualFileName: string;
    filePath: string;
    status: string;
}
