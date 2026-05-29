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
exports.CreateComplianceTrackerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateComplianceTrackerDto {
    locationId;
    complianceConfigId;
    userId;
    dueDate;
    status;
    activity;
    doc;
    complianceCompletionDate;
    complianceCertificate;
    createdBy;
    updatedBy;
}
exports.CreateComplianceTrackerDto = CreateComplianceTrackerDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateComplianceTrackerDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateComplianceTrackerDto.prototype, "complianceConfigId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateComplianceTrackerDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreateComplianceTrackerDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['Compliance', 'In Process', 'Overdue'] }),
    __metadata("design:type", String)
], CreateComplianceTrackerDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['Applied', 'Not Applied', 'Compliant'] }),
    __metadata("design:type", String)
], CreateComplianceTrackerDto.prototype, "activity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateComplianceTrackerDto.prototype, "doc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], CreateComplianceTrackerDto.prototype, "complianceCompletionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateComplianceTrackerDto.prototype, "complianceCertificate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateComplianceTrackerDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateComplianceTrackerDto.prototype, "updatedBy", void 0);
//# sourceMappingURL=create-compliance-tracker.dto.js.map