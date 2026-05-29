import { FileUploadEnum } from './file-upload';
export declare class FileUpload {
    id: number;
    schedulingId: number;
    fileType: FileUploadEnum;
    actualFileName: string;
    filePath: string;
    status: string;
    createdDate: Date;
    createdBy: string;
    updatedDate: Date;
    updatedBy: string;
}
