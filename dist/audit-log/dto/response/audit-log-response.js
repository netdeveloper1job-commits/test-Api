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
exports.AuditLogResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const transformDateToEpoch_1 = require("../../../common/helper/decorators/transformDateToEpoch");
class AuditLogResponse {
    id;
    user_id;
    loginTime;
    logOutTime;
    loginStatus;
    ipAddress;
    deviceType;
    actionAccessed;
    createdAt;
}
exports.AuditLogResponse = AuditLogResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AuditLogResponse.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], AuditLogResponse.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AuditLogResponse.prototype, "loginTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AuditLogResponse.prototype, "logOutTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuditLogResponse.prototype, "loginStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuditLogResponse.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuditLogResponse.prototype, "deviceType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuditLogResponse.prototype, "actionAccessed", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: Date.now() / 1000 }),
    (0, transformDateToEpoch_1.TransformDateToEpoch)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], AuditLogResponse.prototype, "createdAt", void 0);
//# sourceMappingURL=audit-log-response.js.map