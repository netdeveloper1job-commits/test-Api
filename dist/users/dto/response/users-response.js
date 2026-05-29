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
exports.UserResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const transformDateToEpoch_1 = require("../../../common/helper/decorators/transformDateToEpoch");
const typeorm_1 = require("typeorm");
class UserResponse {
    id;
    name;
    emailId;
    phoneNumber;
    password;
    designation;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
}
exports.UserResponse = UserResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "emailId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "designation", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "createdBy", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponse.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: Date.now() / 1000 }),
    (0, transformDateToEpoch_1.TransformDateToEpoch)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], UserResponse.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: Date.now() / 1000 }),
    (0, transformDateToEpoch_1.TransformDateToEpoch)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], UserResponse.prototype, "updatedAt", void 0);
//# sourceMappingURL=users-response.js.map