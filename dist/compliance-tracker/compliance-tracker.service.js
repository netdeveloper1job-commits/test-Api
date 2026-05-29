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
exports.ComplianceTrackerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_1 = require("../common/constants/messages");
const typeorm_2 = require("typeorm");
const compliance_tracker_entity_1 = require("./entities/compliance-tracker.entity");
const event_log_service_1 = require("../event-log/event-log.service");
let ComplianceTrackerService = class ComplianceTrackerService {
    complianceTrackerRepository;
    eventLogService;
    constructor(complianceTrackerRepository, eventLogService) {
        this.complianceTrackerRepository = complianceTrackerRepository;
        this.eventLogService = eventLogService;
    }
    async create(request, user) {
        if (request.activity === 'Compliant') {
            request.status = 'Compliance';
        }
        else if (request.activity === 'Applied') {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30);
            request.dueDate = dueDate;
            request.status = 'In Process';
        }
        else if (request.activity === 'Not Applied') {
            request.status = 'Overdue';
        }
        const data = this.complianceTrackerRepository.create(request);
        const result = await this.complianceTrackerRepository.save(data);
        if (result) {
            await this.eventLogService.create({
                moduleName: 'Compliance Enter Details',
                eventName: 'Create',
                oldValue: '',
                newValue: JSON.stringify(result),
                eventPrimeryKey: result.id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Created} : Compliance Tracker`,
                data: result,
            };
        }
        throw new Error('Failed to create compliance tracker');
    }
    async findAll(search) {
        const query = this.complianceTrackerRepository
            .createQueryBuilder('compliance_trackers')
            .leftJoinAndSelect('compliance_trackers.location', 'location')
            .leftJoinAndSelect('compliance_trackers.complianceConfig', 'complianceConfig')
            .leftJoinAndSelect('complianceConfig.complianceCategory', 'complianceCategory')
            .leftJoinAndSelect('compliance_trackers.user', 'user');
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('CAST(compliance_trackers.locationId AS CHAR) LIKE :locationKey', {
                    locationKey: `%${search}%`,
                })
                    .orWhere('CAST(compliance_trackers.complianceConfigId AS CHAR) LIKE :configKey', {
                    configKey: `%${search}%`,
                })
                    .orWhere('CAST(compliance_trackers.userId AS CHAR) LIKE :userKey', {
                    userKey: `%${search}%`,
                })
                    .orWhere('LOWER(compliance_trackers.status) LIKE :statusKey', {
                    statusKey: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(compliance_trackers.doc) LIKE :docKey', {
                    docKey: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(compliance_trackers.complianceCertificate) LIKE :certificateKey', {
                    certificateKey: `%${search.toLowerCase()}%`,
                });
            }));
        }
        const result = await query.getMany();
        return {
            message: `${messages_1.Messages.Resource.Found}: Compliance Tracker`,
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.complianceTrackerRepository.findOne({
            where: { id },
            relations: ['location', 'complianceConfig', 'user'],
        });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Compliance Tracker`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : Compliance Tracker`,
            data: result,
        };
    }
    async update(complianceTrackerId, request, user) {
        const oldData = await this.complianceTrackerRepository.findOne({
            where: { id: complianceTrackerId },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Tracker`, common_1.HttpStatus.NOT_FOUND);
        }
        if (request.activity === 'Compliant') {
            request.status = 'Compliance';
        }
        else if (request.activity === 'Applied') {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30);
            request.dueDate = dueDate;
            request.status = 'In Process';
        }
        else if (request.activity === 'Not Applied') {
            request.status = 'Overdue';
        }
        console.log('request', request);
        await this.complianceTrackerRepository.update({ id: complianceTrackerId }, request);
        const updatedData = await this.complianceTrackerRepository.findOne({
            where: { id: complianceTrackerId },
        });
        await this.eventLogService.create({
            moduleName: 'Compliance Enter Details',
            eventName: 'Update',
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(updatedData),
            eventPrimeryKey: complianceTrackerId,
            eventUserId: user.userId,
            eventUserName: user.username,
            eventDateTime: new Date(),
        });
        return {
            message: `${messages_1.Messages.Resource.Updated} : Compliance Tracker`,
        };
    }
    async remove(id, user) {
        const oldData = await this.complianceTrackerRepository.findOne({
            where: { id },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Tracker`, common_1.HttpStatus.NOT_FOUND);
        }
        const deleteData = await this.complianceTrackerRepository.delete(id);
        if (deleteData.affected && deleteData.affected > 0) {
            await this.eventLogService.create({
                moduleName: 'Compliance Enter Details',
                eventName: 'Delete',
                oldValue: JSON.stringify(oldData),
                newValue: '',
                eventPrimeryKey: id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Deleted} : Compliance Tracker`,
            };
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Compliance Tracker`, common_1.HttpStatus.NOT_FOUND);
    }
    async getComplianceTrackerByComplianceCategoryId(complianceCategoryId) {
        const result = await this.complianceTrackerRepository
            .createQueryBuilder('tracker')
            .leftJoinAndSelect('tracker.location', 'location')
            .leftJoinAndSelect('tracker.complianceConfig', 'complianceConfig')
            .leftJoinAndSelect('tracker.user', 'user')
            .where('tracker.complianceCategoryId = :complianceCategoryId', {
            complianceCategoryId,
        })
            .orderBy('tracker.createdAt', 'DESC')
            .getMany();
        return {
            message: result.length
                ? `${messages_1.Messages.Resource.Found}: Compliance Tracker`
                : `${messages_1.Messages.Resource.NotFound}: Compliance Tracker`,
            data: result,
        };
    }
};
exports.ComplianceTrackerService = ComplianceTrackerService;
exports.ComplianceTrackerService = ComplianceTrackerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compliance_tracker_entity_1.ComplianceTracker)),
    __metadata("design:paramtypes", [typeorm_2.Repository, event_log_service_1.EventLogService])
], ComplianceTrackerService);
//# sourceMappingURL=compliance-tracker.service.js.map