import { FileUploadEnum } from "src/file-upload/entities/file-upload";
export declare class FileUploadResponse {
    id: number;
    schedulingId: number;
    fileType: FileUploadEnum;
    actualFileName: string;
    filePath: string;
    status: string;
    createdDate?: Date;
    createdBy: string;
    updatedDate: Date;
    updatedBy: string;
}
