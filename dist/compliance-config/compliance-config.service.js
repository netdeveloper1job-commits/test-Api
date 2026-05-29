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
exports.ComplianceConfigService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_1 = require("../common/constants/messages");
const typeorm_2 = require("typeorm");
const compliance_config_entity_1 = require("./entities/compliance-config.entity");
const event_log_service_1 = require("../event-log/event-log.service");
let ComplianceConfigService = class ComplianceConfigService {
    complianceConfigRepository;
    eventLogService;
    constructor(complianceConfigRepository, eventLogService) {
        this.complianceConfigRepository = complianceConfigRepository;
        this.eventLogService = eventLogService;
    }
    async create(request, user) {
        const data = this.complianceConfigRepository.create(request);
        const result = await this.complianceConfigRepository.save(data);
        if (result) {
            const userId = user?.id || user?.userId;
            if (!userId) {
                throw new Error('Invalid user for audit log');
            }
            await this.eventLogService.create({
                moduleName: 'Compliance Config',
                eventName: 'Create',
                oldValue: '',
                newValue: JSON.stringify(result),
                eventPrimeryKey: result.id,
                eventUserId: userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Created} : Compliance Config`,
                data: result,
            };
        }
        throw new Error('Failed to create compliance config');
    }
    async findAll(search) {
        const query = this.complianceConfigRepository
            .createQueryBuilder('compliance_configs')
            .leftJoinAndSelect('compliance_configs.industryType', 'industryType')
            .leftJoinAndSelect('compliance_configs.complianceCategory', 'complianceCategory');
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('CAST(compliance_configs.industryTypeId AS CHAR) LIKE :industryTypeKey', {
                    industryTypeKey: `%${search}%`,
                })
                    .orWhere('CAST(compliance_configs.complianceCategoryId AS CHAR) LIKE :categoryIdKey', {
                    categoryIdKey: `%${search}%`,
                })
                    .orWhere('LOWER(compliance_configs.complianceItem) LIKE :complianceItemKey', {
                    complianceItemKey: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(compliance_configs.riskCategory) LIKE :riskCategoryKey', {
                    riskCategoryKey: `%${search.toLowerCase()}%`,
                });
            }));
        }
        const result = await query.getMany();
        return {
            message: `${messages_1.Messages.Resource.Found}: Compliance Config`,
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.complianceConfigRepository.findOne({
            where: { id },
            relations: ['industryType', 'complianceCategory'],
        });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Compliance Config`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : Compliance Config`,
            data: result,
        };
    }
    async update(complianceConfigId, request, user) {
        const oldData = await this.complianceConfigRepository.findOne({
            where: { id: complianceConfigId },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Config`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.complianceConfigRepository
            .createQueryBuilder()
            .update(compliance_config_entity_1.ComplianceConfig)
            .set(request)
            .where({ id: complianceConfigId })
            .execute();
        const updatedData = await this.complianceConfigRepository.findOne({
            where: { id: complianceConfigId },
        });
        await this.eventLogService.create({
            moduleName: 'Compliance Config',
            eventName: 'Update',
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(updatedData),
            eventPrimeryKey: complianceConfigId,
            eventUserId: user.userId,
            eventUserName: user.username,
            eventDateTime: new Date()
        });
        return {
            message: `${messages_1.Messages.Resource.Updated} : Compliance Config`,
        };
    }
    async remove(id, user) {
        const oldData = await this.complianceConfigRepository.findOne({
            where: { id },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Config`, common_1.HttpStatus.NOT_FOUND);
        }
        const deleteData = await this.complianceConfigRepository.delete(id);
        if (deleteData.affected && deleteData.affected > 0) {
            await this.eventLogService.create({
                moduleName: 'Compliance Config',
                eventName: 'Delete',
                oldValue: JSON.stringify(oldData),
                newValue: '',
                eventPrimeryKey: id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Deleted} : Compliance Config`,
            };
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Config`, common_1.HttpStatus.NOT_FOUND);
    }
    async getComplianceConfigByComplianceCategoryId(complianceCategoryId) {
        const result = await this.complianceConfigRepository.find({
            where: { complianceCategoryId },
            relations: ['industryType', 'complianceCategory'],
        });
        if (!result || result.length === 0) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Compliance Config`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found}: Compliance Config`,
            data: result,
        };
    }
};
exports.ComplianceConfigService = ComplianceConfigService;
exports.ComplianceConfigService = ComplianceConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compliance_config_entity_1.ComplianceConfig)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_log_service_1.EventLogService])
], ComplianceConfigService);
//# sourceMappingURL=compliance-config.service.js.map