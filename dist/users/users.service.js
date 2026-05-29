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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const messages_1 = require("../common/constants/messages");
const event_log_service_1 = require("../event-log/event-log.service");
let UsersService = class UsersService {
    userRepository;
    eventLogService;
    constructor(userRepository, eventLogService) {
        this.userRepository = userRepository;
        this.eventLogService = eventLogService;
    }
    async create(request, user) {
        const data = this.userRepository.create(request);
        const result = await this.userRepository.save(data);
        if (result) {
            await this.eventLogService.create({
                moduleName: 'User',
                eventName: 'Create',
                oldValue: '',
                newValue: JSON.stringify(result),
                eventPrimeryKey: result.id,
                eventUserId: user.userId,
                eventUserName: user.username,
                eventDateTime: new Date(),
            });
            return {
                message: `${messages_1.Messages.Resource.Created} : User`,
                data: result,
            };
        }
        throw new Error('Failed to create user');
    }
    async findAll(search) {
        const query = this.userRepository
            .createQueryBuilder('users')
            .where('(users.designation IS NULL OR LOWER(users.designation) NOT IN (:...adminDesignations))', {
            adminDesignations: ['administrator', 'adminstrator'],
        });
        if (search) {
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('LOWER(users.name) LIKE :nameKey', {
                    nameKey: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(users.designation) LIKE :designationKey', {
                    designationKey: `%${search.toLowerCase()}%`,
                })
                    .orWhere('LOWER(users.emailId) LIKE :emailIdKey', {
                    emailIdKey: `%${search.toLowerCase()}%`,
                });
            }));
        }
        const users = await query.getMany();
        return {
            message: `${messages_1.Messages.Resource.Found}: User`,
            data: users,
        };
    }
    async findOne(id) {
        const result = await this.userRepository.findOne({
            where: { id },
        });
        if (!result) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound}: User`, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            message: `${messages_1.Messages.Resource.Found} : User`,
            data: result,
        };
    }
    async update(userId, request, user) {
        const oldData = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : User`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update({ id: userId }, request);
        const updatedData = await this.userRepository.findOne({
            where: { id: userId },
        });
        await this.eventLogService.create({
            moduleName: 'Input Details',
            eventName: 'Update',
            oldValue: JSON.stringify(oldData),
            newValue: JSON.stringify(updatedData),
            eventPrimeryKey: userId,
            eventUserId: user.userId,
            eventUserName: user.username,
            eventDateTime: new Date(),
        });
        return {
            message: `${messages_1.Messages.Resource.Updated} : User`,
        };
    }
    async remove(id, user) {
        const oldData = await this.userRepository.findOne({
            where: { id },
        });
        if (!oldData) {
            throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : User`, common_1.HttpStatus.NOT_FOUND);
        }
        const deleteData = await this.userRepository.delete(id);
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
                message: `${messages_1.Messages.Resource.Deleted} : User`,
            };
        }
        throw new common_1.HttpException(`${messages_1.Messages.Resource.NotFound} : User`, common_1.HttpStatus.NOT_FOUND);
    }
    async findByEmailId(emailId) {
        const user = await this.userRepository.findOne({
            where: { emailId },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, event_log_service_1.EventLogService])
], UsersService);
//# sourceMappingURL=users.service.js.map