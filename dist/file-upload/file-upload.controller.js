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
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const file_upload_service_1 = require("./file-upload.service");
const create_file_upload_dto_1 = require("./dto/request/create-file-upload.dto");
const update_file_upload_dto_1 = require("./dto/request/update-file-upload.dto");
const constants_1 = require("../auth/constants");
const file_upload_http_routes_1 = require("./file-upload.http.routes");
const platform_express_1 = require("@nestjs/platform-express");
const uploadImage_1 = require("../common/helper/uploadImage/uploadImage");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const upload_file_with_response_1 = require("./dto/response/upload-file-with-response");
let FileUploadController = class FileUploadController {
    fileUploadService;
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    create(createFileUploadDto) {
        return this.fileUploadService.create(createFileUploadDto);
    }
    update(id, updateFileUploadDto) {
        return this.fileUploadService.update(+id, updateFileUploadDto);
    }
    remove(id) {
        return this.fileUploadService.remove(+id);
    }
    uploadFile(file) {
        return this.fileUploadService.uploadFile(file);
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_file_upload_dto_1.CreateFileUploadDto]),
    __metadata("design:returntype", void 0)
], FileUploadController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_file_upload_dto_1.UpdateFileUploadDto]),
    __metadata("design:returntype", void 0)
], FileUploadController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FileUploadController.prototype, "remove", null);
__decorate([
    (0, constants_1.Public)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Upload image',
        type: upload_file_with_response_1.UploadFileWithResponse,
    }),
    (0, common_1.Post)(file_upload_http_routes_1.FileUploadRoutes.upload_image),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', uploadImage_1.multerOptions)),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", upload_file_with_response_1.UploadFileWithResponse)
], FileUploadController.prototype, "uploadFile", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, swagger_1.ApiTags)('File Upload'),
    (0, common_1.Controller)({ path: file_upload_http_routes_1.FileUploadParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('file-upload'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file-upload.controller.js.map