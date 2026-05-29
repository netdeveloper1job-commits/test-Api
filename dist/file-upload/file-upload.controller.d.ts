import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/request/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/request/update-file-upload.dto';
import { UploadFileWithResponse } from './dto/response/upload-file-with-response';
import type { UploadedFileType } from './types/uploaded-file.type';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    create(createFileUploadDto: CreateFileUploadDto): Promise<{
        message: string;
        data: import("./entities/file-upload.entity").FileUpload;
    } | undefined>;
    update(id: string, updateFileUploadDto: UpdateFileUploadDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    } | undefined>;
    uploadFile(file: UploadedFileType): UploadFileWithResponse;
}
