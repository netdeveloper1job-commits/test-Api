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
exports.ComplianceTrackerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const compliance_tracker_http_routes_1 = require("./compliance-tracker.http.routes");
const compliance_tracker_service_1 = require("./compliance-tracker.service");
const create_compliance_tracker_dto_1 = require("./dto/request/create-compliance-tracker.dto");
const update_compliance_tracker_dto_1 = require("./dto/request/update-compliance-tracker.dto");
const compliance_tracker_with_response_1 = require("./dto/response/compliance-tracker-with-response");
let ComplianceTrackerController = class ComplianceTrackerController {
    complianceTrackerService;
    constructor(complianceTrackerService) {
        this.complianceTrackerService = complianceTrackerService;
    }
    create(createComplianceTrackerDto, req) {
        return this.complianceTrackerService.create(createComplianceTrackerDto, req.user);
    }
    findAll(search) {
        return this.complianceTrackerService.findAll(search);
    }
    findOne(id) {
        return this.complianceTrackerService.findOne(+id);
    }
    updateById(id, body, req) {
        return this.complianceTrackerService.update(+id, body, req.user);
    }
    remove(id, req) {
        return this.complianceTrackerService.remove(+id, req.user);
    }
    getComplianceTrackerByComplianceCategoryId(complianceCategoryId) {
        return this.complianceTrackerService.getComplianceTrackerByComplianceCategoryId(+complianceCategoryId);
    }
};
exports.ComplianceTrackerController = ComplianceTrackerController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create compliance tracker',
        type: compliance_tracker_with_response_1.ComplianceTrackerWithResponse,
    }),
    (0, common_1.Post)(compliance_tracker_http_routes_1.ComplianceTrackerRoutes.create),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_compliance_tracker_dto_1.CreateComplianceTrackerDto, Object]),
    __metadata("design:returntype", void 0)
], ComplianceTrackerController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all compliance trackers',
        type: compliance_tracker_with_response_1.ComplianceTrackerWithResponse,
    }),
    (0, common_1.Get)(compliance_tracker_http_routes_1.ComplianceTrackerRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceTrackerController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get compliance tracker by id',
        type: compliance_tracker_with_response_1.ComplianceTrackerWithResponse,
    }),
    (0, common_1.Get)(compliance_tracker_http_routes_1.ComplianceTrackerRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceTrackerController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update compliance tracker by id',
        type: compliance_tracker_with_response_1.ComplianceTrackerWithResponse,
    }),
    (0, common_1.Put)(compliance_tracker_http_routes_1.ComplianceTrackerRoutes.update),
    __param(0, (0, common_1.Param)('complianceTrackerId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_compliance_tracker_dto_1.UpdateComplianceTrackerDto, Object]),
    __metadata("design:returntype", void 0)
], ComplianceTrackerController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete compliance tracker by id',
        type: compliance_tracker_with_response_1.ComplianceTrackerWithResponse,
    }),
    (0, common_1.Delete)(compliance_tracker_http_routes_1.ComplianceTrackerRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ComplianceTrackerController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get compliance trackers by compliance category id',
        type: compliance_tracker_with_response_1.ComplianceTrackerWithResponse,
    }),
    (0, common_1.Get)(compliance_tracker_http_routes_1.ComplianceTrackerRoutes.getComplianceTrackerByComplianceCategoryId),
    __param(0, (0, common_1.Param)('complianceCategoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComplianceTrackerController.prototype, "getComplianceTrackerByComplianceCategoryId", null);
exports.ComplianceTrackerController = ComplianceTrackerController = __decorate([
    (0, swagger_1.ApiTags)('Compliance Tracker'),
    (0, common_1.Controller)({ path: compliance_tracker_http_routes_1.ComplianceTrackerParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [compliance_tracker_service_1.ComplianceTrackerService])
], ComplianceTrackerController);
//# sourceMappingURL=compliance-tracker.controller.js.map