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
exports.AuditLogWithResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class AuditLogWithResponse {
    message;
    data;
    constructor(message, data) {
        this.data = data;
        this.message = message;
    }
}
exports.AuditLogWithResponse = AuditLogWithResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Message',
        description: 'Input detail operation completed successfully',
        example: 'Process Successful',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AuditLogWithResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: 'Data',
        description: 'Specifies response data',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], AuditLogWithResponse.prototype, "data", void 0);
//# sourceMappingURL=audit-log-with-reponse.js.map