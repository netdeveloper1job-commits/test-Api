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
exports.ComplianceCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_1 = require("../common/constants/messages");
const typeorm_2 = require("typeorm");
const compliance_category_entity_1 = require("./entities/compliance-category.entity");
const event_log_service_1 = require("../event-log/event-log.service");
let ComplianceCategoryService = class ComplianceCategoryService {
    complianceCategoryRepository;
    eventLogService;
    constructor(complianceCategoryRepository, eventLogService) {
        this.complianceCategoryRepository = complianceCategoryRepository;
        this.eventLogService = eventLogService;
    }
    async create(request, user) {
        const data = this.complianceCategoryRepository.create(request);
        const result = await this.complianceCategoryRepository.save(data);
        if (result) {
            await this.eventLogService.create({
                moduleName: 'Compliance Category',
                eventName: 'Create',
                oldValue: '',
                newValue: JSON.stringify(result),
                eventPrimeryKey: result.id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Created} : Compliance Category`,
                data: result,
            };
        }
        throw new Error('Failed to create compliance category');
    }
    async findAll(search) {
        const query = this.complianceCategoryRepository
            .createQueryBuilder('compliance_categories')
            .leftJoinAndSelect('compliance_categories.complianceTrackers', 'tracker')
            .leftJoinAndSelect('tracker.location', 'location')
            .leftJoinAndSelect('tracker.user', 'user');
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('LOWER(compliance_categories.complianceCategoryName) LIKE :nameKey', {
                    nameKey: `%${search.toLowerCase()}%`,
                }).orWhere('CAST(compliance_categories.industryTypeId AS CHAR) LIKE :industryTypeIdKey', {
                    industryTypeIdKey: `%${search}%`,
                });
            }));
        }
        const result = await query.getMany();
        const transformed = result.map((category) => {
            let totalComplianceTrackers = 0;
            let totalComplaints = 0;
            let totalOverdue = 0;
            let totalAlert = 0;
            const trackers = category.complianceTrackers || [];
            const enrichedTrackers = trackers.map((tracker) => {
                totalComplianceTrackers++;
                const activity = (tracker.activity || '').toLowerCase();
                const isCompliant = activity === 'compliant';
                const isApplied = activity === 'applied';
                const isNotApplied = activity === 'not applied';
                let alert = 0;
                let overdue = 0;
                if (!isCompliant) {
                    const daysDiff = this.getDaysDiffFromToday(tracker.dueDate);
                    if (daysDiff !== null) {
                        if (daysDiff < 0) {
                            overdue = 1;
                            totalOverdue++;
                        }
                        else if (daysDiff <= 30) {
                            alert = 1;
                            totalAlert++;
                        }
                    }
                }
                if (!isCompliant) {
                    totalComplaints++;
                }
                const trackerStatus = {
                    applied: isApplied ? 1 : 0,
                    notApplied: isNotApplied ? 1 : 0,
                    compliant: isCompliant ? 1 : 0,
                    alert,
                    overdue,
                };
                return {
                    ...tracker,
                    trackerStatus,
                };
            });
            return {
                ...category,
                complianceTrackers: enrichedTrackers,
                totalComplianceTrackers,
                totalComplaints,
                totalOverdue,
                totalAlert,
            };
        });
        return {
            message: `${messages_1.Messages.Resource.Found}: Compliance Category`,
            data: transformed,
        };
    }
    async findOne(id) {
        const result = await this.complianceCategoryRepository.findOne({ where: { id },
            relations: ['industryType'] });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Compliance Category`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : Compliance Category`,
            data: result,
        };
    }
    async update(complianceCategoryId, request, user) {
        const oldData = await this.complianceCategoryRepository.findOne({
            where: { id: complianceCategoryId },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Category`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.complianceCategoryRepository
            .createQueryBuilder()
            .update(compliance_category_entity_1.ComplianceCategory)
            .set(request)
            .where({ id: complianceCategoryId })
            .execute();
        const updatedData = await this.complianceCategoryRepository.findOne({
            where: { id: complianceCategoryId },
        });
        await this.eventLogService.create({
            moduleName: 'Compliance Category',
            eventName: 'Update',
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(updatedData),
            eventPrimeryKey: complianceCategoryId,
            eventUserId: user.userId,
            eventUserName: user.username,
            eventDateTime: new Date()
        });
        return {
            message: `${messages_1.Messages.Resource.Updated} : Compliance Category`,
        };
    }
    async remove(id, user) {
        const oldData = await this.complianceCategoryRepository.findOne({
            where: { id },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Category`, common_1.HttpStatus.NOT_FOUND);
        }
        const deleteData = await this.complianceCategoryRepository.delete(id);
        if (deleteData.affected && deleteData.affected > 0) {
            await this.eventLogService.create({
                moduleName: 'Compliance Category',
                eventName: 'Delete',
                oldValue: JSON.stringify(oldData),
                newValue: '',
                eventPrimeryKey: id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Deleted} : Compliance Category`,
            };
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Category`, common_1.HttpStatus.NOT_FOUND);
    }
    getDaysDiffFromToday = (dueDate) => {
        if (!dueDate)
            return null;
        const today = new Date();
        const due = new Date(dueDate);
        return Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };
    async getComplianceCategoryByIndustryId(industryId) {
        const result = await this.complianceCategoryRepository.find({
            where: { industryTypeId: industryId },
            relations: [
                'industryType',
                'complianceTrackers',
                'complianceTrackers.location',
                'complianceTrackers.user',
            ],
        });
        if (!result?.length) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Compliance Category`, common_1.HttpStatus.NOT_FOUND);
        }
        const transformed = result.map((category) => {
            let totalTrackers = 0;
            let totalComplaints = 0;
            let totalOverdue = 0;
            let totalAlert = 0;
            const trackers = category.complianceTrackers || [];
            const enrichedTrackers = trackers.map((tracker) => {
                totalTrackers++;
                const activity = (tracker.activity || '').toLowerCase();
                const isCompliant = activity === 'compliant';
                const isApplied = activity === 'applied';
                const isNotApplied = activity === 'not applied';
                let alert = 0;
                let overdue = 0;
                if (!isCompliant) {
                    const daysDiff = this.getDaysDiffFromToday(tracker.dueDate);
                    if (daysDiff !== null) {
                        if (daysDiff < 0) {
                            overdue = 1;
                            totalOverdue++;
                        }
                        else if (daysDiff <= 30) {
                            alert = 1;
                            totalAlert++;
                        }
                    }
                }
                const trackerStatus = {
                    applied: isApplied ? 1 : 0,
                    notApplied: isNotApplied ? 1 : 0,
                    compliant: isCompliant ? 1 : 0,
                    alert,
                    overdue,
                };
                if (isCompliant)
                    totalComplaints++;
                return {
                    ...tracker,
                    trackerStatus,
                };
            });
            return {
                ...category,
                complianceTrackers: enrichedTrackers,
                totalComplianceTrackers: totalTrackers,
                totalComplaints,
                totalOverdue,
                totalAlert,
            };
        });
        return {
            message: `${messages_1.Messages.Resource.Found}: Compliance Category`,
            data: transformed,
        };
    }
};
exports.ComplianceCategoryService = ComplianceCategoryService;
exports.ComplianceCategoryService = ComplianceCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compliance_category_entity_1.ComplianceCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_log_service_1.EventLogService])
], ComplianceCategoryService);
//# sourceMappingURL=compliance-category.service.js.map