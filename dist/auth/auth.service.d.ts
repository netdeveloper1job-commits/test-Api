import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<LoginResponseDto>;
}
