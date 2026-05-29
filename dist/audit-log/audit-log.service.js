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
exports.AuditLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const messages_1 = require("../common/constants/messages");
const audit_log_entity_1 = require("./entities/audit-log.entity");
let AuditLogService = class AuditLogService {
    auditLogRepository;
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    async create(request) {
        const data = this.auditLogRepository.create({
            ...request
        });
        const result = await this.auditLogRepository.save(data);
        if (result) {
            return {
                message: `${messages_1.Messages.Resource.Created} : Audit Log`,
                data: result,
            };
        }
        throw new Error('Failed to create audit log');
    }
    async findAll() {
        const result = await this.auditLogRepository.find({
            relations: ['user'],
            order: { id: 'DESC' },
        });
        return {
            message: `${messages_1.Messages.Resource.Found} : Audit Log`,
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.auditLogRepository.findOne({
            where: { id },
        });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Audit Log`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : Audit Log`,
            data: result,
        };
    }
    async remove(id) {
        const deleteData = await this.auditLogRepository.delete(id);
        if (deleteData.affected && deleteData.affected > 0) {
            return {
                message: `${messages_1.Messages.Resource.Deleted} : Audit Log`,
            };
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Audit Log`, common_1.HttpStatus.NOT_FOUND);
    }
    async updateAction(id, body) {
        const auditLog = await this.auditLogRepository.findOne({
            where: { id },
        });
        if (!auditLog) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Audit Log`, common_1.HttpStatus.NOT_FOUND);
        }
        if (body.actionAccessed) {
            auditLog.actionAccessed = body.actionAccessed;
        }
        if (body.ipAddress) {
            auditLog.ipAddress = body.ipAddress;
        }
        if (body.logOutTime) {
            auditLog.logOutTime = body.logOutTime;
        }
        const result = await this.auditLogRepository.save(auditLog);
        return {
            message: `${messages_1.Messages.Resource.Updated} : Audit Log`,
            data: result,
        };
    }
};
exports.AuditLogService = AuditLogService;
exports.AuditLogService = AuditLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditLogService);
//# sourceMappingURL=audit-log.service.js.map