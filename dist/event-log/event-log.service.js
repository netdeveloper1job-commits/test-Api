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
exports.EventLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_log_entity_1 = require("./entities/event-log.entity");
const messages_1 = require("../common/constants/messages");
let EventLogService = class EventLogService {
    eventLogRepository;
    constructor(eventLogRepository) {
        this.eventLogRepository = eventLogRepository;
    }
    async create(request) {
        const data = this.eventLogRepository.create(request);
        const result = await this.eventLogRepository.save(data);
        if (result) {
            return {
                message: `${messages_1.Messages.Resource.Created} : Event Log`,
                data: result,
            };
        }
    }
    async findAll() {
        const result = await this.eventLogRepository.find();
        if (result) {
            return {
                message: `${messages_1.Messages.Resource.Found} : Event Logs`,
                data: result,
            };
        }
    }
    async findOne(id) {
        try {
            const result = await this.eventLogRepository.findOne({
                where: { id },
            });
            if (!result) {
                throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Event Log`, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                message: `${messages_1.Messages.Resource.Found} : Event Log`,
                data: result,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, request) {
        const data = await this.eventLogRepository.findOne({ where: { id } });
        if (!data) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Event Log`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.eventLogRepository.update(id, request);
        return {
            message: `${messages_1.Messages.Resource.Updated} : Event Log`,
        };
    }
    async remove(id) {
        try {
            const deleteData = await this.eventLogRepository.delete(id);
            if ((deleteData?.affected ?? 0) > 0) {
                return {
                    message: `${messages_1.Messages.Resource.Deleted} : Event Log`,
                };
            }
            else {
                throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : Event Log`, common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.EventLogService = EventLogService;
exports.EventLogService = EventLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_log_entity_1.EventLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EventLogService);
//# sourceMappingURL=event-log.service.js.map