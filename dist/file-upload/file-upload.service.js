"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const file_upload_entity_1 = require("./entities/file-upload.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const messages_1 = require("../common/constants/messages");
const upload_file_with_response_1 = require("./dto/response/upload-file-with-response");
var pdfController = require('../common/helper/pdf-generator/pdf-service');
let FileUploadService = class FileUploadService {
    fileUploadRepository;
    constructor(fileUploadRepository) {
        this.fileUploadRepository = fileUploadRepository;
    }
    async create(request) {
        const data = await this.fileUploadRepository.create(request);
        const result = await this.fileUploadRepository.save(data);
        if (result) {
            return {
                message: `${messages_1.Messages.Resource.Created} : File Upload`,
                data: result,
            };
        }
    }
    async update(id, request) {
        const data = await this.fileUploadRepository.findOne({
            where: { id: id },
        });
        if (!data) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : File Upload`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.fileUploadRepository.update(id, request);
        return {
            message: `${messages_1.Messages.Resource.Updated} : File Upload`,
        };
    }
    async remove(id) {
        try {
            const deleteData = await this.fileUploadRepository.delete(id);
            if (deleteData.affected && deleteData.affected > 0) {
                return {
                    message: `${messages_1.Messages.Resource.Deleted} : File Upload`,
                };
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    uploadFile(file) {
        const filePath = `${file.destination.search('inspection-be') !== -1
            ? file.destination.split('inspection-be').pop()
            : file.destination}/${file.filename}`;
        return new upload_file_with_response_1.UploadFileWithResponse('File uploaded successfully', {
            filePath,
            actualFileName: file.originalname,
        });
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(file_upload_entity_1.FileUpload)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map