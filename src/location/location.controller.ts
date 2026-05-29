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
import { CreateLocationDto } from './dto/request/create-location.dto';
import { UpdateLocationDto } from './dto/request/update-location.dto';
import { LocationWithResponse } from './dto/response/location-with-response';
import { LocationParentRoute, LocationRoutes } from './location.http.routes';
import { LocationService } from './location.service';

@ApiTags('Location')
@Controller({ path: LocationParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

@ApiResponse({
  status: 201,
  description: 'Create location',
  type: LocationWithResponse,
})
@Post(LocationRoutes.create)
create(
  @Body() createLocationDto: CreateLocationDto,
  @Req() req: any,
) {
  return this.locationService.create(createLocationDto, req.user);
}

  @ApiResponse({
    status: 200,
    description: 'Get all locations',
    type: LocationWithResponse,
  })
  @Get(LocationRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.locationService.findAll(search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get location by id',
    type: LocationWithResponse,
  })
  @Get(LocationRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update location by id',
    type: LocationWithResponse,
  })
@Put(LocationRoutes.update)
updateById(
  @Param('locationId') id: string,
  @Body() body: UpdateLocationDto,
  @Req() req: any,
) {
  return this.locationService.update(+id, body, req.user);
}

  @ApiResponse({
    status: 200,
    description: 'Delete location by id',
    type: LocationWithResponse,
  })
  @Delete(LocationRoutes.delete)
  remove(@Param('id') id: string,@Req() req: any,) {
    return this.locationService.remove(+id,req.user);
  }
}
