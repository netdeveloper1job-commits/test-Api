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
exports.Location = void 0;
const input_detail_entity_1 = require("../../input-details/entities/input-detail.entity");
const typeorm_1 = require("typeorm");
let Location = class Location {
    id;
    location;
    address;
    industryTypeId;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
    industryType;
};
exports.Location = Location;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Location.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Location.prototype, "industryTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Location.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Location.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], Location.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updatedAt',
        nullable: true,
        default: () => 'null',
    }),
    __metadata("design:type", Date)
], Location.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => input_detail_entity_1.InputDetail, (industry) => industry.locations),
    (0, typeorm_1.JoinColumn)({ name: 'industryTypeId' }),
    __metadata("design:type", input_detail_entity_1.InputDetail)
], Location.prototype, "industryType", void 0);
exports.Location = Location = __decorate([
    (0, typeorm_1.Entity)('locations')
], Location);
//# sourceMappingURL=location.entity.js.map