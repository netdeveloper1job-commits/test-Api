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
exports.UploadFileWithResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const upload_file_response_1 = require("./upload-file-response");
class UploadFileWithResponse {
    message;
    data;
    constructor(message, data) {
        this.message = message;
        this.data = data;
    }
}
exports.UploadFileWithResponse = UploadFileWithResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Message',
        description: 'File upload success message',
        example: 'File uploaded successfully',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UploadFileWithResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Data',
        description: 'Uploaded file details',
        type: upload_file_response_1.UploadFileResponse,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", upload_file_response_1.UploadFileResponse)
], UploadFileWithResponse.prototype, "data", void 0);
//# sourceMappingURL=upload-file-with-response.js.map