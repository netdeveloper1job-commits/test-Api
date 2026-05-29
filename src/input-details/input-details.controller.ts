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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateInputDetailDto } from './dto/request/create-input-detail.dto';
import { UpdateInputDetailDto } from './dto/request/update-input-detail.dto';
import { InputDetailWithResponse } from './dto/response/input-detail-with-response';
import {
  InputDetailsParentRoute,
  InputDetailsRoutes,
} from './input-details.http.routes';
import { InputDetailsService } from './input-details.service';

@ApiTags('Input Details')
@Controller({ path: InputDetailsParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class InputDetailsController {
  constructor(private readonly inputDetailsService: InputDetailsService) {}

  @ApiResponse({
    status: 201,
    description: 'Create input detail',
    type: InputDetailWithResponse,
  })
  @Post(InputDetailsRoutes.create)
  create(@Body() createInputDetailDto: CreateInputDetailDto,  @Req() req: any,) {
    return this.inputDetailsService.create(createInputDetailDto, req.user,);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all input details',
    type: InputDetailWithResponse,
  })
  @Get(InputDetailsRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.inputDetailsService.findAll(search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get input detail by id',
    type: InputDetailWithResponse,
  })
  @Get(InputDetailsRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.inputDetailsService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update input detail by id',
    type: InputDetailWithResponse,
  })
  @Put(InputDetailsRoutes.update)
  updateById(
    @Param('inputDetailId') id: string,
    @Body() body: UpdateInputDetailDto,
    @Req() req: any
  ) {
    return this.inputDetailsService.update(+id, body,req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete input detail by id',
    type: InputDetailWithResponse,
  })
  @Delete(InputDetailsRoutes.delete)
  remove(@Param('id') id: string,  @Req() req: any,) {
    return this.inputDetailsService.remove(+id , req.user);
  }
}
