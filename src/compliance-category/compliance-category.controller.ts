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
import { CreateComplianceCategoryDto } from './dto/request/create-compliance-category.dto';
import { UpdateComplianceCategoryDto } from './dto/request/update-compliance-category.dto';
import { ComplianceCategoryWithResponse } from './dto/response/compliance-category-with-response';
import {
  ComplianceCategoryParentRoute,
  ComplianceCategoryRoutes,
} from './compliance-category.http.routes';
import { ComplianceCategoryService } from './compliance-category.service';

@ApiTags('Compliance Category')
@Controller({ path: ComplianceCategoryParentRoute })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ComplianceCategoryController {
  constructor(
    private readonly complianceCategoryService: ComplianceCategoryService,
  ) {}

@ApiResponse({
  status: 201,
  description: 'Create compliance category',
  type: ComplianceCategoryWithResponse,
})
@Post(ComplianceCategoryRoutes.create)
create(
  @Body() createComplianceCategoryDto: CreateComplianceCategoryDto,
  @Req() req: any,
) {
  return this.complianceCategoryService.create(
    createComplianceCategoryDto,
    req.user,
  );
}

  @ApiResponse({
    status: 200,
    description: 'Get all compliance categories',
    type: ComplianceCategoryWithResponse,
  })
  @Get(ComplianceCategoryRoutes.view_all)
  findAll(@Query('search') search: string) {
    return this.complianceCategoryService.findAll(search);
  }

  @ApiResponse({
    status: 200,
    description: 'Get compliance category by id',
    type: ComplianceCategoryWithResponse,
  })
  @Get(ComplianceCategoryRoutes.view_one)
  findOne(@Param('id') id: string) {
    return this.complianceCategoryService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Update compliance category by id',
    type: ComplianceCategoryWithResponse,
  })
  @Put(ComplianceCategoryRoutes.update)
  updateById(
    @Param('complianceCategoryId') id: string,
    @Body() body: UpdateComplianceCategoryDto,
    @Req() req: any,
  ) {
    return this.complianceCategoryService.update(+id, body, req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete compliance category by id',
    type: ComplianceCategoryWithResponse,
  })
  @Delete(ComplianceCategoryRoutes.delete)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.complianceCategoryService.remove(+id, req.user);
  }

    @ApiResponse({
    status: 200,
    description: 'Get compliance category by id',
    type: ComplianceCategoryWithResponse,
  })
  @Get(ComplianceCategoryRoutes.getComplianceCategoryByIndustryId)
  getComplianceCategoryByIndustryId(@Param('industryId') industryId: number) {
    return this.complianceCategoryService.getComplianceCategoryByIndustryId(+industryId);
  }
}
