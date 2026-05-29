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
exports.ComplianceConfig = void 0;
const compliance_category_entity_1 = require("../../compliance-category/entities/compliance-category.entity");
const compliance_tracker_entity_1 = require("../../compliance-tracker/entities/compliance-tracker.entity");
const input_detail_entity_1 = require("../../input-details/entities/input-detail.entity");
const typeorm_1 = require("typeorm");
let ComplianceConfig = class ComplianceConfig {
    id;
    industryTypeId;
    complianceCategoryId;
    complianceItem;
    riskCategory;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    industryType;
    complianceCategory;
    complianceTrackers;
    complianceConfig;
};
exports.ComplianceConfig = ComplianceConfig;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ComplianceConfig.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ComplianceConfig.prototype, "industryTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ComplianceConfig.prototype, "complianceCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ComplianceConfig.prototype, "complianceItem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ComplianceConfig.prototype, "riskCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceConfig.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceConfig.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], ComplianceConfig.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedAt',
        nullable: true,
        default: () => 'null',
    }),
    __metadata("design:type", Date)
], ComplianceConfig.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => input_detail_entity_1.InputDetail),
    (0, typeorm_1.JoinColumn)({ name: 'industryTypeId' }),
    __metadata("design:type", input_detail_entity_1.InputDetail)
], ComplianceConfig.prototype, "industryType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => compliance_category_entity_1.ComplianceCategory),
    (0, typeorm_1.JoinColumn)({ name: 'complianceCategoryId' }),
    __metadata("design:type", compliance_category_entity_1.ComplianceCategory)
], ComplianceConfig.prototype, "complianceCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => compliance_tracker_entity_1.ComplianceTracker, (tracker) => tracker.complianceCategory),
    __metadata("design:type", Array)
], ComplianceConfig.prototype, "complianceTrackers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => compliance_tracker_entity_1.ComplianceTracker, (tracker) => tracker.complianceConfig),
    __metadata("design:type", Array)
], ComplianceConfig.prototype, "complianceConfig", void 0);
exports.ComplianceConfig = ComplianceConfig = __decorate([
    (0, typeorm_1.Entity)('compliance_configs')
], ComplianceConfig);
//# sourceMappingURL=compliance-config.entity.js.map