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
exports.LocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_location_dto_1 = require("./dto/request/create-location.dto");
const update_location_dto_1 = require("./dto/request/update-location.dto");
const location_with_response_1 = require("./dto/response/location-with-response");
const location_http_routes_1 = require("./location.http.routes");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    locationService;
    constructor(locationService) {
        this.locationService = locationService;
    }
    create(createLocationDto, req) {
        return this.locationService.create(createLocationDto, req.user);
    }
    findAll(search) {
        return this.locationService.findAll(search);
    }
    findOne(id) {
        return this.locationService.findOne(+id);
    }
    updateById(id, body, req) {
        return this.locationService.update(+id, body, req.user);
    }
    remove(id, req) {
        return this.locationService.remove(+id, req.user);
    }
};
exports.LocationController = LocationController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create location',
        type: location_with_response_1.LocationWithResponse,
    }),
    (0, common_1.Post)(location_http_routes_1.LocationRoutes.create),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto, Object]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all locations',
        type: location_with_response_1.LocationWithResponse,
    }),
    (0, common_1.Get)(location_http_routes_1.LocationRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get location by id',
        type: location_with_response_1.LocationWithResponse,
    }),
    (0, common_1.Get)(location_http_routes_1.LocationRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update location by id',
        type: location_with_response_1.LocationWithResponse,
    }),
    (0, common_1.Put)(location_http_routes_1.LocationRoutes.update),
    __param(0, (0, common_1.Param)('locationId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto, Object]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete location by id',
        type: location_with_response_1.LocationWithResponse,
    }),
    (0, common_1.Delete)(location_http_routes_1.LocationRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LocationController.prototype, "remove", null);
exports.LocationController = LocationController = __decorate([
    (0, swagger_1.ApiTags)('Location'),
    (0, common_1.Controller)({ path: location_http_routes_1.LocationParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
//# sourceMappingURL=location.controller.js.map