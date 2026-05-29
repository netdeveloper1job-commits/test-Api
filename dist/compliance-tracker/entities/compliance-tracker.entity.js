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
exports.ComplianceTracker = void 0;
const compliance_category_entity_1 = require("../../compliance-category/entities/compliance-category.entity");
const compliance_config_entity_1 = require("../../compliance-config/entities/compliance-config.entity");
const location_entity_1 = require("../../location/entities/location.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ComplianceTracker = class ComplianceTracker {
    id;
    locationId;
    complianceConfigId;
    userId;
    dueDate;
    status;
    activity;
    doc;
    complianceCategoryId;
    complianceCompletionDate;
    complianceCertificate;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    location;
    user;
    reminderSent;
    complianceCategory;
    complianceConfig;
};
exports.ComplianceTracker = ComplianceTracker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ComplianceTracker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ComplianceTracker.prototype, "locationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ComplianceTracker.prototype, "complianceConfigId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ComplianceTracker.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ComplianceTracker.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Compliance', 'In Process', 'Overdue'] }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Applied', 'Not Applied', 'Compliant'] }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "doc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "complianceCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ComplianceTracker.prototype, "complianceCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "complianceCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceTracker.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], ComplianceTracker.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedAt',
        nullable: true,
        default: () => 'null',
    }),
    __metadata("design:type", Date)
], ComplianceTracker.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location),
    (0, typeorm_1.JoinColumn)({ name: 'locationId' }),
    __metadata("design:type", location_entity_1.Location)
], ComplianceTracker.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], ComplianceTracker.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ComplianceTracker.prototype, "reminderSent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => compliance_category_entity_1.ComplianceCategory, (category) => category.complianceTrackers),
    (0, typeorm_1.JoinColumn)({ name: 'complianceCategoryId' }),
    __metadata("design:type", compliance_category_entity_1.ComplianceCategory)
], ComplianceTracker.prototype, "complianceCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => compliance_config_entity_1.ComplianceConfig),
    (0, typeorm_1.JoinColumn)({ name: 'complianceConfigId' }),
    __metadata("design:type", compliance_config_entity_1.ComplianceConfig)
], ComplianceTracker.prototype, "complianceConfig", void 0);
exports.ComplianceTracker = ComplianceTracker = __decorate([
    (0, typeorm_1.Entity)('compliance_trackers')
], ComplianceTracker);
//# sourceMappingURL=compliance-tracker.entity.js.map