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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceConfigController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const compliance_config_http_routes_1 = require("./compliance-config.http.routes");
const compliance_config_service_1 = require("./compliance-config.service");
const create_compliance_config_dto_1 = require("./dto/request/create-compliance-config.dto");
const update_compliance_config_dto_1 = require("./dto/request/update-compliance-config.dto");
const compliance_config_with_response_1 = require("./dto/response/compliance-config-with-response");
let ComplianceConfigController = class ComplianceConfigController {
    complianceConfigService;
    constructor(complianceConfigService) {
        this.complianceConfigService = complianceConfigService;
    }
    create(createComplianceConfigDto, req) {
        return this.complianceConfigService.create(createComplianceConfigDto, req.user);
    }
    findAll(search) {
        return this.complianceConfigService.findAll(search);
    }
    findOne(id) {
        return this.complianceConfigService.findOne(+id);
    }
    updateById(id, body, req) {
        return this.complianceConfigService.update(+id, body, req.user);
    }
    remove(id, req) {
        return this.complianceConfigService.remove(+id, req.user);
    }
    getComplianceConfigByComplianceCategoryId(complianceCategoryId) {
        return this.complianceConfigService.getComplianceConfigByComplianceCategoryId(+complianceCategoryId);
    }
};
exports.ComplianceConfigController = ComplianceConfigController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create compliance config',
        type: compliance_config_with_response_1.ComplianceConfigWithResponse,
    }),
    (0, common_1.Post)(compliance_config_http_routes_1.ComplianceConfigRoutes.create),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_compliance_config_dto_1.CreateComplianceConfigDto, Object]),
    __metadata("design:returntype", void 0)
], ComplianceConfigController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all compliance configs',
        type: compliance_config_with_response_1.ComplianceConfigWithResponse,
    }),
    (0, common_1.Get)(compliance_config_http_routes_1.ComplianceConfigRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceConfigController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get compliance config by id',
        type: compliance_config_with_response_1.ComplianceConfigWithResponse,
    }),
    (0, common_1.Get)(compliance_config_http_routes_1.ComplianceConfigRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceConfigController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update compliance config by id',
        type: compliance_config_with_response_1.ComplianceConfigWithResponse,
    }),
    (0, common_1.Put)(compliance_config_http_routes_1.ComplianceConfigRoutes.update),
    __param(0, (0, common_1.Param)('complianceConfigId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_compliance_config_dto_1.UpdateComplianceConfigDto, Object]),
    __metadata("design:returntype", void 0)
], ComplianceConfigController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete compliance config by id',
        type: compliance_config_with_response_1.ComplianceConfigWithResponse,
    }),
    (0, common_1.Delete)(compliance_config_http_routes_1.ComplianceConfigRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ComplianceConfigController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get compliance configs by compliance category id',
        type: compliance_config_with_response_1.ComplianceConfigWithResponse,
    }),
    (0, common_1.Get)(compliance_config_http_routes_1.ComplianceConfigRoutes.getComplianceConfigByComplianceCategoryId),
    __param(0, (0, common_1.Param)('complianceCategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceConfigController.prototype, "getComplianceConfigByComplianceCategoryId", null);
exports.ComplianceConfigController = ComplianceConfigController = __decorate([
    (0, swagger_1.ApiTags)('Compliance Config'),
    (0, common_1.Controller)({ path: compliance_config_http_routes_1.ComplianceConfigParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [compliance_config_service_1.ComplianceConfigService])
], ComplianceConfigController);
//# sourceMappingURL=compliance-config.controller.js.map