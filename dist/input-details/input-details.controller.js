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
exports.InputDetailsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_input_detail_dto_1 = require("./dto/request/create-input-detail.dto");
const update_input_detail_dto_1 = require("./dto/request/update-input-detail.dto");
const input_detail_with_response_1 = require("./dto/response/input-detail-with-response");
const input_details_http_routes_1 = require("./input-details.http.routes");
const input_details_service_1 = require("./input-details.service");
let InputDetailsController = class InputDetailsController {
    inputDetailsService;
    constructor(inputDetailsService) {
        this.inputDetailsService = inputDetailsService;
    }
    create(createInputDetailDto, req) {
        return this.inputDetailsService.create(createInputDetailDto, req.user);
    }
    findAll(search) {
        return this.inputDetailsService.findAll(search);
    }
    findOne(id) {
        return this.inputDetailsService.findOne(+id);
    }
    updateById(id, body, req) {
        return this.inputDetailsService.update(+id, body, req.user);
    }
    remove(id, req) {
        return this.inputDetailsService.remove(+id, req.user);
    }
};
exports.InputDetailsController = InputDetailsController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create input detail',
        type: input_detail_with_response_1.InputDetailWithResponse,
    }),
    (0, common_1.Post)(input_details_http_routes_1.InputDetailsRoutes.create),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_input_detail_dto_1.CreateInputDetailDto, Object]),
    __metadata("design:returntype", void 0)
], InputDetailsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all input details',
        type: input_detail_with_response_1.InputDetailWithResponse,
    }),
    (0, common_1.Get)(input_details_http_routes_1.InputDetailsRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InputDetailsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get input detail by id',
        type: input_detail_with_response_1.InputDetailWithResponse,
    }),
    (0, common_1.Get)(input_details_http_routes_1.InputDetailsRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InputDetailsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update input detail by id',
        type: input_detail_with_response_1.InputDetailWithResponse,
    }),
    (0, common_1.Put)(input_details_http_routes_1.InputDetailsRoutes.update),
    __param(0, (0, common_1.Param)('inputDetailId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_input_detail_dto_1.UpdateInputDetailDto, Object]),
    __metadata("design:returntype", void 0)
], InputDetailsController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete input detail by id',
        type: input_detail_with_response_1.InputDetailWithResponse,
    }),
    (0, common_1.Delete)(input_details_http_routes_1.InputDetailsRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InputDetailsController.prototype, "remove", null);
exports.InputDetailsController = InputDetailsController = __decorate([
    (0, swagger_1.ApiTags)('Input Details'),
    (0, common_1.Controller)({ path: input_details_http_routes_1.InputDetailsParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [input_details_service_1.InputDetailsService])
], InputDetailsController);
//# sourceMappingURL=input-details.controller.js.map