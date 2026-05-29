"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const compliance_category_controller_1 = require("./compliance-category.controller");
const compliance_category_service_1 = require("./compliance-category.service");
const compliance_category_entity_1 = require("./entities/compliance-category.entity");
const event_log_module_1 = require("../event-log/event-log.module");
let ComplianceCategoryModule = class ComplianceCategoryModule {
};
exports.ComplianceCategoryModule = ComplianceCategoryModule;
exports.ComplianceCategoryModule = ComplianceCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([compliance_category_entity_1.ComplianceCategory]), event_log_module_1.EventLogModule],
        controllers: [compliance_category_controller_1.ComplianceCategoryController],
        providers: [compliance_category_service_1.ComplianceCategoryService],
    })
], ComplianceCategoryModule);
//# sourceMappingURL=compliance-category.module.js.map