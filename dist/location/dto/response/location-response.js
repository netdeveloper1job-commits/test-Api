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
exports.LocationResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const transformDateToEpoch_1 = require("../../../common/helper/decorators/transformDateToEpoch");
const typeorm_1 = require("typeorm");
class LocationResponse {
    id;
    location;
    address;
    industryTypeId;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
}
exports.LocationResponse = LocationResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], LocationResponse.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LocationResponse.prototype, "location", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LocationResponse.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LocationResponse.prototype, "industryTypeId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LocationResponse.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], LocationResponse.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: Date.now() / 1000 }),
    (0, transformDateToEpoch_1.TransformDateToEpoch)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], LocationResponse.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: Date.now() / 1000 }),
    (0, transformDateToEpoch_1.TransformDateToEpoch)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], LocationResponse.prototype, "updatedAt", void 0);
//# sourceMappingURL=location-response.js.map