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
import {
  ComplianceTrackerParentRoute,
  ComplianceTrackerRoutes,
} from './compliance-tracker.http.routes';
import { ComplianceTrackerService } from './compliance-tracker.service';
import { CreateComplianceTrackerDto } from './dto/request/create-compliance-tracker.dto';
import { UpdateComplianceTrackerDto } from './dto/request/update-compliance-tracker.dto';
import { ComplianceTrackerWithResponse } from './dto/response/compliance-tracker-with-response';

@ApiTags('Compliance Tracker')
@Controller({ path: ComplianceTrackerParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ComplianceTrackerController {
  constructor(
    private readonly complianceTrackerService: ComplianceTrackerService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Create compliance tracker',
    type: ComplianceTrackerWithResponse,
  })
  @Post(ComplianceTrackerRoutes.create)
  create(@Body() createComplianceTrackerDto: CreateComplianceTrackerDto , @Req() req: any,) {
    return this.complianceTrackerService.create(createComplianceTrackerDto,req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Get all compliance trackers',
    type: ComplianceTrackerWithResponse,
  })
  @Get(ComplianceTrackerRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.complianceTrackerService.findAll(search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get compliance tracker by id',
    type: ComplianceTrackerWithResponse,
  })
  @Get(ComplianceTrackerRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.complianceTrackerService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update compliance tracker by id',
    type: ComplianceTrackerWithResponse,
  })
@Put(ComplianceTrackerRoutes.update)
updateById(
  @Param('complianceTrackerId') id: string,
  @Body() body: UpdateComplianceTrackerDto,
  @Req() req: any,
) {
  return this.complianceTrackerService.update(+id, body, req.user);
}

@ApiResponse({
  status: 200,
  description: 'Delete compliance tracker by id',
  type: ComplianceTrackerWithResponse,
})
@Delete(ComplianceTrackerRoutes.delete)
remove(
  @Param('id') id: string,
  @Req() req: any,
) {
  return this.complianceTrackerService.remove(+id, req.user);
}

  @ApiResponse({
    status: 200,
    description: 'Get compliance trackers by compliance category id',
    type: ComplianceTrackerWithResponse,
  })
  @Get(ComplianceTrackerRoutes.getComplianceTrackerByComplianceCategoryId)
  getComplianceTrackerByComplianceCategoryId(
    @Param('complianceCategoryId') complianceCategoryId: string,
  ) {
    return this.complianceTrackerService.getComplianceTrackerByComplianceCategoryId(
      +complianceCategoryId,
    );
  }
}
