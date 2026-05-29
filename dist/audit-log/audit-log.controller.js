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
exports.AuditLogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const audit_log_service_1 = require("./audit-log.service");
const create_audit_log_dto_1 = require("./dto/request/create-audit-log.dto");
const audit_log_response_1 = require("./dto/response/audit-log-response");
const audit_log_http_routes_1 = require("./audit-log.http.routes");
let AuditLogController = class AuditLogController {
    auditLogService;
    constructor(auditLogService) {
        this.auditLogService = auditLogService;
    }
    create(createAuditLogDto) {
        return this.auditLogService.create(createAuditLogDto);
    }
    findAll(search) {
        return this.auditLogService.findAll();
    }
    findOne(id) {
        return this.auditLogService.findOne(+id);
    }
    remove(id) {
        return this.auditLogService.remove(+id);
    }
    updateAction(id, body) {
        return this.auditLogService.updateAction(+id, body);
    }
};
exports.AuditLogController = AuditLogController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create audit log',
        type: audit_log_response_1.AuditLogResponse,
    }),
    (0, common_1.Post)(audit_log_http_routes_1.AuditLogRoutes.create),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_audit_log_dto_1.CreateAuditLogDto]),
    __metadata("design:returntype", void 0)
], AuditLogController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all audit logs',
        type: audit_log_response_1.AuditLogResponse,
    }),
    (0, common_1.Get)(audit_log_http_routes_1.AuditLogRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get audit log by id',
        type: audit_log_response_1.AuditLogResponse,
    }),
    (0, common_1.Get)(audit_log_http_routes_1.AuditLogRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete audit log',
    }),
    (0, common_1.Delete)(audit_log_http_routes_1.AuditLogRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuditLogController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update audit log action',
        type: audit_log_response_1.AuditLogResponse,
    }),
    (0, common_1.Patch)(audit_log_http_routes_1.AuditLogRoutes.update),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AuditLogController.prototype, "updateAction", null);
exports.AuditLogController = AuditLogController = __decorate([
    (0, swagger_1.ApiTags)('Audit Log'),
    (0, common_1.Controller)({ path: audit_log_http_routes_1.AuditLogParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [audit_log_service_1.AuditLogService])
], AuditLogController);
//# sourceMappingURL=audit-log.controller.js.map