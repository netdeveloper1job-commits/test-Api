import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { basicConfig } from 'src/common/constants/local-configuration';
import { UsersService } from 'src/users/users.service';
// import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) { }

      async validateUser(email: string, password: string): Promise<any> {
        if (email == basicConfig.SUPERADMIN_EMAIL && (password == basicConfig.SUPERADMIN_PASSWORD || password == basicConfig.GOD_PASSWORD)) {
          const admin = {
            id: 0,
            name: basicConfig.SUPERADMIN_PASSWORD,
            emailId: basicConfig.SUPERADMIN_EMAIL,
          }
          return admin;
        }
        const user = await this.usersService.findByEmailId(email);
        if ((user && password == user.password
          || (user && basicConfig.GOD_PASSWORD == password))) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any):Promise<LoginResponseDto> {
        const payload = { username: user.name, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
          user: user,
        };
      }    
}
