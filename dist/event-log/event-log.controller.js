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
exports.EventLogController = void 0;
const common_1 = require("@nestjs/common");
const event_log_service_1 = require("./event-log.service");
const update_event_log_dto_1 = require("./dto/request/update-event-log.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const event_logWithResponse_1 = require("./dto/response/event-logWithResponse");
const event_log_http_routes_1 = require("./event-log.http.routes");
const create_event_log_dto_1 = require("./dto/request/create-event-log.dto");
let EventLogController = class EventLogController {
    eventLogService;
    constructor(eventLogService) {
        this.eventLogService = eventLogService;
    }
    create(createEventLogDto) {
        return this.eventLogService.create(createEventLogDto);
    }
    findAll() {
        return this.eventLogService.findAll();
    }
    findOne(id) {
        return this.eventLogService.findOne(+id);
    }
    update(id, updateEventLogDto) {
        return this.eventLogService.update(+id, updateEventLogDto);
    }
    remove(id) {
        return this.eventLogService.remove(+id);
    }
};
exports.EventLogController = EventLogController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Event Log Creation.',
        type: event_logWithResponse_1.EventLogWithResponse,
    }),
    (0, common_1.Post)(event_log_http_routes_1.EventLogRoutes.create),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_log_dto_1.CreateEventLogDto]),
    __metadata("design:returntype", void 0)
], EventLogController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'View all Event Logs.',
        type: [event_logWithResponse_1.EventLogWithResponse],
    }),
    (0, common_1.Get)(event_log_http_routes_1.EventLogRoutes.view_all),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventLogController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'View single Event Log.',
        type: event_logWithResponse_1.EventLogWithResponse,
    }),
    (0, common_1.Get)(event_log_http_routes_1.EventLogRoutes.view_one),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventLogController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Event Log Update',
        type: update_event_log_dto_1.UpdateEventLogDto,
    }),
    (0, common_1.Put)(event_log_http_routes_1.EventLogRoutes.update),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_log_dto_1.UpdateEventLogDto]),
    __metadata("design:returntype", void 0)
], EventLogController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Event Log Delete',
    }),
    (0, common_1.Delete)(event_log_http_routes_1.EventLogRoutes.delete),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventLogController.prototype, "remove", null);
exports.EventLogController = EventLogController = __decorate([
    (0, swagger_1.ApiTags)('event-log'),
    (0, common_1.Controller)({ path: event_log_http_routes_1.EventLogParentRoute }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('event-log'),
    __metadata("design:paramtypes", [event_log_service_1.EventLogService])
], EventLogController);
//# sourceMappingURL=event-log.controller.js.map