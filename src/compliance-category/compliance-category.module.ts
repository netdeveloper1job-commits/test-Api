import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceCategoryController } from './compliance-category.controller';
import { ComplianceCategoryService } from './compliance-category.service';
import { ComplianceCategory } from './entities/compliance-category.entity';
import { EventLogModule } from 'src/event-log/event-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceCategory]), EventLogModule],
  controllers: [ComplianceCategoryController],
  providers: [ComplianceCategoryService],
})
export class ComplianceCategoryModule {}
