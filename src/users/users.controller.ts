import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserParentRoute, UserRoutes } from './users.http.routes';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserWithResponse } from './dto/response/usersWithResponce';


/* ####################################### SWAGGER DOCUMENTATION : Start ####################################### */
@ApiTags('Users')
/* ######################################## SWAGGER DOCUMENTATION : End ######################################## */

@Controller({ path: UserParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

@ApiResponse({
  status: 201,
  description: 'Create user',
  type: UserWithResponse,
})
@Post(UserRoutes.create)
create(
  @Body() createUserDto: CreateUserDto,
  @Req() req: any,
) {
  return this.userService.create(createUserDto, req.user);
}
  
  @ApiResponse({
    status: 201,
    description: 'Get all users.',
    type: UserWithResponse,
  })
  @Get(UserRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.userService.findAll(search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: UserWithResponse,
  })
  @Get(UserRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update user by id',
    type: UserWithResponse,
  })
  @Put(UserRoutes.update)
  updateByUserId(@Param('userId') id: string, @Body() body: UpdateUserDto, @Req() req: any,) {
    return this.userService.update(+id, body , req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete user by id',
    type: UserWithResponse,
  })
  @Delete(UserRoutes.delete)
  remove(@Param('id') id: string,@Req() req: any, ) {
    return this.userService.remove(+id, req.user);
  }
}

