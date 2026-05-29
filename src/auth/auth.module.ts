import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { EventLogModule } from "src/event-log/event-log.module";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    EventLogModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '10m' },
      }),
  ],
  providers:[AuthService, UsersService, LocalStrategy, JwtStrategy ,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
  controllers:[AuthController],
})
export class AuthModule {}