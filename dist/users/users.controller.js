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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const swagger_1 = require("@nestjs/swagger");
const users_http_routes_1 = require("./users.http.routes");
const create_user_dto_1 = require("./dto/request/create-user.dto");
const update_user_dto_1 = require("./dto/request/update-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const usersWithResponce_1 = require("./dto/response/usersWithResponce");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto, req) {
        return this.userService.create(createUserDto, req.user);
    }
    findAll(search) {
        return this.userService.findAll(search);
    }
    findOne(id) {
        return this.userService.findOne(+id);
    }
    updateByUserId(id, body, req) {
        return this.userService.update(+id, body, req.user);
    }
    remove(id, req) {
        return this.userService.remove(+id, req.user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Create user',
        type: usersWithResponce_1.UserWithResponse,
    }),
    (0, common_1.Post)(users_http_routes_1.UserRoutes.create),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Get all users.',
        type: usersWithResponce_1.UserWithResponse,
    }),
    (0, common_1.Get)(users_http_routes_1.UserRoutes.view_all),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get user by id',
        type: usersWithResponce_1.UserWithResponse,
    }),
    (0, common_1.Get)(users_http_routes_1.UserRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Update user by id',
        type: usersWithResponce_1.UserWithResponse,
    }),
    (0, common_1.Put)(users_http_routes_1.UserRoutes.update),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateByUserId", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Delete user by id',
        type: usersWithResponce_1.UserWithResponse,
    }),
    (0, common_1.Delete)(users_http_routes_1.UserRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)({ path: users_http_routes_1.UserParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserController);
//# sourceMappingURL=users.controller.js.map