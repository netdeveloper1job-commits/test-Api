import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/request/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/request/update-file-upload.dto';
import { Public } from 'src/auth/constants';
import {
  FileUploadParentRoute,
  FileUploadRoutes,
} from './file-upload.http.routes';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/helper/uploadImage/uploadImage';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadFileWithResponse } from './dto/response/upload-file-with-response';
import type { UploadedFileType } from './types/uploaded-file.type';

@ApiTags('File Upload')
@Controller({ path: FileUploadParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.create(createFileUploadDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadDto: UpdateFileUploadDto,
  ) {
    return this.fileUploadService.update(+id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadService.remove(+id);
  }

  @Public()
  @ApiResponse({
    status: 201,
    description: 'Upload image',
    type: UploadFileWithResponse,
  })
  @Post(FileUploadRoutes.upload_image)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(@UploadedFile() file: UploadedFileType): UploadFileWithResponse {
    return this.fileUploadService.uploadFile(file);
  }
}
