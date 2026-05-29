"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const input_details_controller_1 = require("./input-details.controller");
const input_details_service_1 = require("./input-details.service");
const input_detail_entity_1 = require("./entities/input-detail.entity");
const event_log_module_1 = require("../event-log/event-log.module");
let InputDetailsModule = class InputDetailsModule {
};
exports.InputDetailsModule = InputDetailsModule;
exports.InputDetailsModule = InputDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([input_detail_entity_1.InputDetail]), event_log_module_1.EventLogModule],
        controllers: [input_details_controller_1.InputDetailsController],
        providers: [input_details_service_1.InputDetailsService],
    })
], InputDetailsModule);
//# sourceMappingURL=input-details.module.js.map