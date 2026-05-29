import { CreateFileUploadDto } from './dto/request/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/request/update-file-upload.dto';
import { FileUpload } from './entities/file-upload.entity';
import { Repository } from 'typeorm';
import { UploadFileWithResponse } from './dto/response/upload-file-with-response';
import { UploadedFileType } from './types/uploaded-file.type';
export declare class FileUploadService {
    private fileUploadRepository;
    constructor(fileUploadRepository: Repository<FileUpload>);
    create(request: CreateFileUploadDto): Promise<{
        message: string;
        data: FileUpload;
    } | undefined>;
    update(id: number, request: UpdateFileUploadDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    } | undefined>;
    uploadFile(file: UploadedFileType): UploadFileWithResponse;
}
