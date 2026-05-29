import { UpdateUserDto } from './dto/request/update-user.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserWithResponse } from './dto/response/usersWithResponce';
import { UserResponse } from './dto/response/users-response';
import { EventLogService } from 'src/event-log/event-log.service';
export declare class UsersService {
    private userRepository;
    private readonly eventLogService;
    constructor(userRepository: Repository<User>, eventLogService: EventLogService);
    create(request: CreateUserDto, user: any): Promise<UserWithResponse>;
    findAll(search: string): Promise<UserWithResponse>;
    findOne(id: number): Promise<UserWithResponse>;
    update(userId: number, request: UpdateUserDto, user: any): Promise<UserWithResponse>;
    remove(id: number, user: any): Promise<UserWithResponse>;
    findByEmailId(emailId: string): Promise<UserResponse>;
}
