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
  ComplianceConfigParentRoute,
  ComplianceConfigRoutes,
} from './compliance-config.http.routes';
import { ComplianceConfigService } from './compliance-config.service';
import { CreateComplianceConfigDto } from './dto/request/create-compliance-config.dto';
import { UpdateComplianceConfigDto } from './dto/request/update-compliance-config.dto';
import { ComplianceConfigWithResponse } from './dto/response/compliance-config-with-response';

@ApiTags('Compliance Config')
@Controller({ path: ComplianceConfigParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ComplianceConfigController {
  constructor(
    private readonly complianceConfigService: ComplianceConfigService,
  ) {}

@ApiResponse({
  status: 201,
  description: 'Create compliance config',
  type: ComplianceConfigWithResponse,
})
@Post(ComplianceConfigRoutes.create)
create(
  @Body() createComplianceConfigDto: CreateComplianceConfigDto,
  @Req() req: any,
) {
  return this.complianceConfigService.create(
    createComplianceConfigDto,
    req.user,
  );
}

  @ApiResponse({
    status: 200,
    description: 'Get all compliance configs',
    type: ComplianceConfigWithResponse,
  })
  @Get(ComplianceConfigRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.complianceConfigService.findAll(search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get compliance config by id',
    type: ComplianceConfigWithResponse,
  })
  @Get(ComplianceConfigRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.complianceConfigService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update compliance config by id',
    type: ComplianceConfigWithResponse,
  })
  @Put(ComplianceConfigRoutes.update)
  updateById(
    @Param('complianceConfigId') id: string,
    @Body() body: UpdateComplianceConfigDto,
    @Req() req: any,
  ) {
    return this.complianceConfigService.update(+id, body, req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete compliance config by id',
    type: ComplianceConfigWithResponse,
  })
  @Delete(ComplianceConfigRoutes.delete)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.complianceConfigService.remove(+id, req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Get compliance configs by compliance category id',
    type: ComplianceConfigWithResponse,
  })
  @Get(ComplianceConfigRoutes.getComplianceConfigByComplianceCategoryId)
  getComplianceConfigByComplianceCategoryId(
    @Param('complianceCategoryId') complianceCategoryId: string,
  ) {
    return this.complianceConfigService.getComplianceConfigByComplianceCategoryId(
      +complianceCategoryId,
    );
  }
}
