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
exports.FileUpload = void 0;
const typeorm_1 = require("typeorm");
const file_upload_1 = require("./file-upload");
let FileUpload = class FileUpload {
    id;
    schedulingId;
    fileType;
    actualFileName;
    filePath;
    status;
    createdDate;
    createdBy;
    updatedDate;
    updatedBy;
};
exports.FileUpload = FileUpload;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileUpload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], FileUpload.prototype, "schedulingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: file_upload_1.FileUploadEnum.SAMPLE }),
    __metadata("design:type", String)
], FileUpload.prototype, "fileType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FileUpload.prototype, "actualFileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FileUpload.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FileUpload.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdDate' }),
    __metadata("design:type", Date)
], FileUpload.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FileUpload.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedDate',
        nullable: true,
        default: () => 'null',
    }),
    __metadata("design:type", Date)
], FileUpload.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FileUpload.prototype, "updatedBy", void 0);
exports.FileUpload = FileUpload = __decorate([
    (0, typeorm_1.Entity)('file-upload')
], FileUpload);
//# sourceMappingURL=file-upload.entity.js.map