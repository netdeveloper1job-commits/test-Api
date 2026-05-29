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
exports.ComplianceCategoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_compliance_category_dto_1 = require("./dto/request/create-compliance-category.dto");
const update_compliance_category_dto_1 = require("./dto/request/update-compliance-category.dto");
const compliance_category_with_response_1 = require("./dto/response/compliance-category-with-response");
const compliance_category_http_routes_1 = require("./compliance-category.http.routes");
const compliance_category_service_1 = require("./compliance-category.service");
let ComplianceCategoryController = class ComplianceCategoryController {
    complianceCategoryService;
    constructor(complianceCategoryService) {
        this.complianceCategoryService = complianceCategoryService;
    }
    create(createComplianceCategoryDto, req) {
        return this.complianceCategoryService.create(createComplianceCategoryDto, req.user);
    }
    findAll(search) {
        return this.complianceCategoryService.findAll(search);
    }
    findOne(id) {
        return this.complianceCategoryService.findOne(+id);
    }
    updateById(id, body, req) {
        return this.complianceCategoryService.update(+id, body, req.user);
    }
    remove(id, req) {
        return this.complianceCategoryService.remove(+id, req.user);
    }
    getComplianceCategoryByIndustryId(industryId) {
        return this.complianceCategoryService.getComplianceCategoryByIndustryId(+industryId);
    }
};
exports.ComplianceCategoryController = ComplianceCategoryController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create compliance category',
        type: compliance_category_with_response_1.ComplianceCategoryWithResponse,
    }),
    (0, common_1.Post)(compliance_category_http_routes_1.ComplianceCategoryRoutes.create),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_compliance_category_dto_1.CreateComplianceCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ComplianceCategoryController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all compliance categories',
        type: compliance_category_with_response_1.ComplianceCategoryWithResponse,
    }),
    (0, common_1.Get)(compliance_category_http_routes_1.ComplianceCategoryRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceCategoryController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get compliance category by id',
        type: compliance_category_with_response_1.ComplianceCategoryWithResponse,
    }),
    (0, common_1.Get)(compliance_category_http_routes_1.ComplianceCategoryRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceCategoryController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update compliance category by id',
        type: compliance_category_with_response_1.ComplianceCategoryWithResponse,
    }),
    (0, common_1.Put)(compliance_category_http_routes_1.ComplianceCategoryRoutes.update),
    __param(0, (0, common_1.Param)('complianceCategoryId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_compliance_category_dto_1.UpdateComplianceCategoryDto, Object]),
    __metadata("design:returntype", void 0)
], ComplianceCategoryController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete compliance category by id',
        type: compliance_category_with_response_1.ComplianceCategoryWithResponse,
    }),
    (0, common_1.Delete)(compliance_category_http_routes_1.ComplianceCategoryRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ComplianceCategoryController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get compliance category by id',
        type: compliance_category_with_response_1.ComplianceCategoryWithResponse,
    }),
    (0, common_1.Get)(compliance_category_http_routes_1.ComplianceCategoryRoutes.getComplianceCategoryByIndustryId),
    __param(0, (0, common_1.Param)('industryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ComplianceCategoryController.prototype, "getComplianceCategoryByIndustryId", null);
exports.ComplianceCategoryController = ComplianceCategoryController = __decorate([
    (0, swagger_1.ApiTags)('Compliance Category'),
    (0, common_1.Controller)({ path: compliance_category_http_routes_1.ComplianceCategoryParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [compliance_category_service_1.ComplianceCategoryService])
], ComplianceCategoryController);
//# sourceMappingURL=compliance-category.controller.js.map