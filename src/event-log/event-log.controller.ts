import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { UpdateEventLogDto } from './dto/request/update-event-log.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventLogWithResponse } from './dto/response/event-logWithResponse';
import { EventLogParentRoute, EventLogRoutes } from './event-log.http.routes';
import { CreateEventLogDto } from './dto/request/create-event-log.dto';

@ApiTags('event-log')
@Controller({ path: EventLogParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('event-log')
export class EventLogController {
  constructor(private readonly eventLogService: EventLogService) {}

  @ApiResponse({
    status: 201,
    description: 'Event Log Creation.',
    type: EventLogWithResponse,
  })
  @Post(EventLogRoutes.create)
  create(@Body() createEventLogDto: CreateEventLogDto) {
    return this.eventLogService.create(createEventLogDto);
  }

  @ApiResponse({
    status: 201,
    description: 'View all Event Logs.',
    type: [EventLogWithResponse],
  })
  @Get(EventLogRoutes.view_all)
  findAll() {
    return this.eventLogService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'View single Event Log.',
    type: EventLogWithResponse,
  })
  @Get(EventLogRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.eventLogService.findOne(+id);
  }

  @ApiResponse({
    status: 201,
    description: 'Event Log Update',
    type: UpdateEventLogDto,
  })
  
  @Put(EventLogRoutes.update)
  update(@Param('id') id: string, @Body() updateEventLogDto: UpdateEventLogDto) {
    return this.eventLogService.update(+id, updateEventLogDto);
  }

  @ApiResponse({
    status: 201,
    description: 'Event Log Delete',
  })
  @Delete(EventLogRoutes.delete)
  remove(@Param('id') id: string) {
    return this.eventLogService.remove(+id);
  }
}
