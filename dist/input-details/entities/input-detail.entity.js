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
exports.InputDetail = void 0;
const compliance_category_entity_1 = require("../../compliance-category/entities/compliance-category.entity");
const location_entity_1 = require("../../location/entities/location.entity");
const typeorm_1 = require("typeorm");
let InputDetail = class InputDetail {
    id;
    attributeType;
    attributeName;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    locations;
    complianceCategories;
};
exports.InputDetail = InputDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InputDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InputDetail.prototype, "attributeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InputDetail.prototype, "attributeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InputDetail.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InputDetail.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], InputDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedAt',
        nullable: true,
        default: () => 'null',
    }),
    __metadata("design:type", Date)
], InputDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => location_entity_1.Location, (location) => location.industryType),
    __metadata("design:type", Array)
], InputDetail.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => compliance_category_entity_1.ComplianceCategory, (category) => category.industryType),
    __metadata("design:type", Array)
], InputDetail.prototype, "complianceCategories", void 0);
exports.InputDetail = InputDetail = __decorate([
    (0, typeorm_1.Entity)('input_details')
], InputDetail);
//# sourceMappingURL=input-detail.entity.js.map