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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_1 = require("../common/constants/messages");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./entities/location.entity");
const event_log_service_1 = require("../event-log/event-log.service");
let LocationService = class LocationService {
    locationRepository;
    eventLogService;
    constructor(locationRepository, eventLogService) {
        this.locationRepository = locationRepository;
        this.eventLogService = eventLogService;
    }
    async create(request, user) {
        const data = this.locationRepository.create(request);
        const result = await this.locationRepository.save(data);
        if (result) {
            await this.eventLogService.create({
                moduleName: 'Location',
                eventName: 'Create',
                oldValue: '',
                newValue: JSON.stringify(result),
                eventPrimeryKey: result.id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Created} : Location`,
                data: result,
            };
        }
        throw new Error('Failed to create location');
    }
    getDaysDiffFromToday = (dueDate) => {
        if (!dueDate)
            return null;
        const today = new Date();
        const due = new Date(dueDate);
        return Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    };
    async findAll(search) {
        const query = this.locationRepository
            .createQueryBuilder('location')
            .leftJoinAndSelect('location.industryType', 'industryType')
            .leftJoinAndSelect('industryType.complianceCategories', 'complianceCategory')
            .leftJoinAndSelect('complianceCategory.complianceTrackers', 'complianceTracker');
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('LOWER(location.location) LIKE :search', {
                    search: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(location.address) LIKE :search', {
                    search: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(industryType.name) LIKE :search', {
                    search: `%${search.toLowerCase()}%`,
                });
            }));
        }
        const result = await query.getMany();
        if (!result?.length) {
            return {
                message: `${messages_1.Messages.Resource.NotFound}: Location`,
                data: [],
            };
        }
        const transformed = result.map((location) => {
            let totalCategories = 0;
            let totalTrackers = 0;
            let totalComplaints = 0;
            let totalOverdue = 0;
            let totalAlert = 0;
            const industryType = location.industryType;
            const complianceCategories = (industryType?.complianceCategories || []).map((category) => {
                totalCategories++;
                const trackers = category.complianceTrackers || [];
                let categoryTrackers = 0;
                for (const tracker of trackers) {
                    totalTrackers++;
                    categoryTrackers++;
                    const status = (tracker.status || '').toLowerCase();
                    if (status === 'compliant') {
                        totalComplaints++;
                    }
                    const daysDiff = this.getDaysDiffFromToday(tracker.dueDate);
                    if (daysDiff !== null) {
                        if (daysDiff < 0) {
                            totalOverdue++;
                        }
                        else if (daysDiff <= 30) {
                            totalAlert++;
                        }
                    }
                }
                return {
                    ...category,
                    totalTrackers: categoryTrackers,
                };
            });
            return {
                ...location,
                industryType: {
                    ...industryType,
                    complianceCategories,
                },
                grandTotals: {
                    totalCategories,
                    totalTrackers,
                    totalComplaints,
                    totalOverdue,
                    totalAlert,
                },
            };
        });
        return {
            message: `${messages_1.Messages.Resource.Found}: Location`,
            data: transformed,
        };
    }
    async findOne(id) {
        const result = await this.locationRepository.findOne({
            where: { id },
        });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Location`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : Location`,
            data: result,
        };
    }
    async update(locationId, request, user) {
        const oldData = await this.locationRepository.findOne({
            where: { id: locationId },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Location`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.locationRepository.update({ id: locationId }, request);
        const updatedData = await this.locationRepository.findOne({
            where: { id: locationId },
        });
        await this.eventLogService.create({
            moduleName: 'Input Details',
            eventName: 'Update',
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(updatedData),
            eventPrimeryKey: locationId,
            eventUserId: user.userId,
            eventUserName: user.username,
            eventDateTime: new Date(),
        });
        return {
            message: `${messages_1.Messages.Resource.Updated} : Location`,
        };
    }
    async remove(id, user) {
        const oldData = await this.locationRepository.findOne({
            where: { id },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Location`, common_1.HttpStatus.NOT_FOUND);
        }
        const deleteData = await this.locationRepository.delete(id);
        if (deleteData.affected && deleteData.affected > 0) {
            await this.eventLogService.create({
                moduleName: 'Input Details',
                eventName: 'Delete',
                oldValue: JSON.stringify(oldData),
                newValue: '',
                eventPrimeryKey: id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Deleted} : Location`,
            };
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Location`, common_1.HttpStatus.NOT_FOUND);
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_log_service_1.EventLogService])
], LocationService);
//# sourceMappingURL=location.service.js.map