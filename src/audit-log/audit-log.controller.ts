import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/request/create-audit-log.dto';
import type { Request } from 'express';
import { AuditLogResponse } from './dto/response/audit-log-response';
import { AuditLogParentRoute, AuditLogRoutes } from './audit-log.http.routes';

@ApiTags('Audit Log')
@Controller({ path: AuditLogParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  // CREATE LOG
  @ApiResponse({
    status: 201,
    description: 'Create audit log',
    type: AuditLogResponse,
  })
  @Post(AuditLogRoutes.create)
  create(@Body() createAuditLogDto: CreateAuditLogDto,) {
    return this.auditLogService.create(
      createAuditLogDto,
    );  
  }

  // GET ALL LOGS
  @ApiResponse({
    status: 200,
    description: 'Get all audit logs',
    type: AuditLogResponse,
  })
  @Get(AuditLogRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.auditLogService.findAll();
  }

  // GET ONE LOG
  @ApiResponse({
    status: 200,
    description: 'Get audit log by id',
    type: AuditLogResponse,
  })
  @Get(AuditLogRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.auditLogService.findOne(+id);
  }

  //  DELETE LOG
  @ApiResponse({
    status: 200,
    description: 'Delete audit log',
  })
  @Delete(AuditLogRoutes.delete)
  remove(@Param('id') id: string) {
    return this.auditLogService.remove(+id);
  }

  @ApiResponse({
  status: 200,
  description: 'Update audit log action',
  type: AuditLogResponse,
})

@Patch(AuditLogRoutes.update)
updateAction(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.auditLogService.updateAction(
    +id,
    body,
  );
}
}