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
exports.InputDetailsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const messages_1 = require("../common/constants/messages");
const typeorm_2 = require("typeorm");
const input_detail_entity_1 = require("./entities/input-detail.entity");
const event_log_service_1 = require("../event-log/event-log.service");
let InputDetailsService = class InputDetailsService {
    inputDetailsRepository;
    eventLogService;
    constructor(inputDetailsRepository, eventLogService) {
        this.inputDetailsRepository = inputDetailsRepository;
        this.eventLogService = eventLogService;
    }
    async create(request, user) {
        const data = this.inputDetailsRepository.create(request);
        const result = await this.inputDetailsRepository.save(data);
        if (result) {
            await this.eventLogService.create({
                moduleName: 'Input Detail',
                eventName: 'Create',
                oldValue: '',
                newValue: JSON.stringify(result),
                eventPrimeryKey: result.id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Created} : Input Detail`,
                data: result,
            };
        }
        throw new Error('Failed to create input detail');
    }
    async findAll(search) {
        const query = this.inputDetailsRepository.createQueryBuilder('input_details');
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('LOWER(input_details.attributeType) LIKE :attributeTypeKey', {
                    attributeTypeKey: `%${search.toLowerCase()}%`,
                }).orWhere('LOWER(input_details.attributeName) LIKE :attributeNameKey', {
                    attributeNameKey: `%${search.toLowerCase()}%`,
                });
            }));
        }
        const result = await query.getMany();
        return {
            message: `${messages_1.Messages.Resource.Found}: Input Detail`,
            data: result,
        };
    }
    async findOne(id) {
        const result = await this.inputDetailsRepository.findOne({ where: { id } });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: Input Detail`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : Input Detail`,
            data: result,
        };
    }
    async update(inputDetailId, request, user) {
        const oldData = await this.inputDetailsRepository.findOne({
            where: { id: inputDetailId },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Input Detail`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.inputDetailsRepository.update({ id: inputDetailId }, request);
        const updatedData = await this.inputDetailsRepository.findOne({
            where: { id: inputDetailId },
        });
        await this.eventLogService.create({
            moduleName: 'Input Detail',
            eventName: 'Update',
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(updatedData),
            eventPrimeryKey: inputDetailId,
            eventUserId: user.userId,
            eventUserName: user.username,
            eventDateTime: new Date()
        });
        return {
            message: `${messages_1.Messages.Resource.Updated} : Input Detail`,
        };
    }
    async remove(id, user) {
        const oldData = await this.inputDetailsRepository.findOne({
            where: { id },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Input Detail`, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            const deleteData = await this.inputDetailsRepository.delete(id);
            if (deleteData.affected && deleteData.affected > 0) {
                await this.eventLogService.create({
                    moduleName: 'Input Detail',
                    eventName: 'Delete',
                    oldValue: JSON.stringify(oldData),
                    newValue: '',
                    eventPrimeryKey: id,
                    eventUserId: user.userId,
                    eventUserName: user.username,
                    eventDateTime: new Date(),
                });
                return {
                    message: `${messages_1.Messages.Resource.Deleted} : Input Detail`,
                };
            }
        }
        catch (error) {
            throw error;
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Input Detail`, common_1.HttpStatus.NOT_FOUND);
    }
};
exports.InputDetailsService = InputDetailsService;
exports.InputDetailsService = InputDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(input_detail_entity_1.InputDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository, event_log_service_1.EventLogService])
], InputDetailsService);
//# sourceMappingURL=input-details.service.js.map