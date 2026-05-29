import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformDateToEpoch } from 'src/common/helper/decorators/transformDateToEpoch';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ComplianceConfigResponse {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Expose()
  industryTypeId: number;

  @Expose()
  complianceCategoryId: number;

  @Expose()
  complianceItem: string;

  @Expose()
  riskCategory: string;

  @Expose()
  createdBy?: string;

  @Expose()
  updatedBy?: string;

  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  createdAt?: Date;

  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  updatedAt?: Date;
}
