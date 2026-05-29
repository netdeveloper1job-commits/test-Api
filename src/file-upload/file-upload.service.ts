import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFileUploadDto } from './dto/request/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/request/update-file-upload.dto';
import { FileUpload } from './entities/file-upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messages } from 'src/common/constants/messages';
import { UploadFileWithResponse } from './dto/response/upload-file-with-response';
import { UploadedFileType } from './types/uploaded-file.type';

var pdfController = require('../common/helper/pdf-generator/pdf-service');

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(FileUpload)
    private fileUploadRepository: Repository<FileUpload>,
  ) {}
  async create(request: CreateFileUploadDto) {
    const data = await this.fileUploadRepository.create(request);
    const result = await this.fileUploadRepository.save(data);
    if (result) {
      return {
        message: `${Messages.Resource.Created} : File Upload`,
        data: result,
      };
    }
  }

  async update(id: number, request: UpdateFileUploadDto) {
    const data = await this.fileUploadRepository.findOne({
      where: { id: id },
    });

    if (!data) {
      throw new HttpException(
        `${Messages.Resource.NotFound} : File Upload`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.fileUploadRepository.update(id, request);
    return {
      message: `${Messages.Resource.Updated} : File Upload`,
    };
  }

  async remove(id: number) {
    try {
      const deleteData = await this.fileUploadRepository.delete(id);
      if (deleteData.affected && deleteData.affected > 0) {
        return {
          message: `${Messages.Resource.Deleted} : File Upload`,
        };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  uploadFile(file: UploadedFileType): UploadFileWithResponse {
    const filePath = `${
      file.destination.search('inspection-be') !== -1
        ? file.destination.split('inspection-be').pop()
        : file.destination
    }/${file.filename}`;

    return new UploadFileWithResponse('File uploaded successfully', {
      filePath,
      actualFileName: file.originalname,
    });
  }
}
