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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFileUploadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const file_upload_1 = require("../../entities/file-upload");
class CreateFileUploadDto {
    schedulingId;
    fileType;
    actualFileName;
    filePath;
    status;
}
exports.CreateFileUploadDto = CreateFileUploadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateFileUploadDto.prototype, "schedulingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: file_upload_1.FileUploadEnum.SAMPLE }),
    __metadata("design:type", String)
], CreateFileUploadDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateFileUploadDto.prototype, "actualFileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateFileUploadDto.prototype, "filePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateFileUploadDto.prototype, "status", void 0);
//# sourceMappingURL=create-file-upload.dto.js.map