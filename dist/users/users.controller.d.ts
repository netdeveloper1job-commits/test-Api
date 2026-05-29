import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserWithResponse } from './dto/response/usersWithResponce';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    create(createUserDto: CreateUserDto, req: any): Promise<UserWithResponse>;
    findAll(search: string): Promise<UserWithResponse>;
    findOne(id: string): Promise<UserWithResponse>;
    updateByUserId(id: string, body: UpdateUserDto, req: any): Promise<UserWithResponse>;
    remove(id: string, req: any): Promise<UserWithResponse>;
}
