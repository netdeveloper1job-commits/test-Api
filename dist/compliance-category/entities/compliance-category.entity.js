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
exports.ComplianceCategory = void 0;
const compliance_config_entity_1 = require("../../compliance-config/entities/compliance-config.entity");
const compliance_tracker_entity_1 = require("../../compliance-tracker/entities/compliance-tracker.entity");
const input_detail_entity_1 = require("../../input-details/entities/input-detail.entity");
const typeorm_1 = require("typeorm");
let ComplianceCategory = class ComplianceCategory {
    id;
    industryTypeId;
    complianceCategoryName;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    industryType;
    complianceConfigs;
    complianceTrackers;
};
exports.ComplianceCategory = ComplianceCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ComplianceCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ComplianceCategory.prototype, "industryTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ComplianceCategory.prototype, "complianceCategoryName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceCategory.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ComplianceCategory.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], ComplianceCategory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedAt',
        nullable: true,
        default: () => 'null',
    }),
    __metadata("design:type", Date)
], ComplianceCategory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => input_detail_entity_1.InputDetail),
    (0, typeorm_1.JoinColumn)({ name: 'industryTypeId' }),
    __metadata("design:type", input_detail_entity_1.InputDetail)
], ComplianceCategory.prototype, "industryType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => compliance_config_entity_1.ComplianceConfig, (config) => config.complianceCategory),
    __metadata("design:type", Array)
], ComplianceCategory.prototype, "complianceConfigs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => compliance_tracker_entity_1.ComplianceTracker, (tracker) => tracker.complianceCategory),
    __metadata("design:type", Array)
], ComplianceCategory.prototype, "complianceTrackers", void 0);
exports.ComplianceCategory = ComplianceCategory = __decorate([
    (0, typeorm_1.Entity)('compliance_categories')
], ComplianceCategory);
//# sourceMappingURL=compliance-category.entity.js.map