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
exports.InvoiceEmailDto = exports.EmailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EmailDto {
    content;
    to;
    reqData;
    userEmail;
}
exports.EmailDto = EmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object, additionalProperties: { type: 'string' } }),
    __metadata("design:type", Object)
], EmailDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmailDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmailDto.prototype, "reqData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], EmailDto.prototype, "userEmail", void 0);
class InvoiceEmailDto {
    content;
    to;
    reqData;
    salesPersonMailId;
}
exports.InvoiceEmailDto = InvoiceEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvoiceEmailDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvoiceEmailDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvoiceEmailDto.prototype, "reqData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], InvoiceEmailDto.prototype, "salesPersonMailId", void 0);
//# sourceMappingURL=emailDto.dto.js.map