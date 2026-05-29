import { FileUploadResponse } from "./file-upload-response";
export declare class FileUploadWithResponse {
    message: string;
    data?: FileUploadResponse | FileUploadResponse[];
    constructor(message: string, data: FileUploadResponse | FileUploadResponse[]);
}
