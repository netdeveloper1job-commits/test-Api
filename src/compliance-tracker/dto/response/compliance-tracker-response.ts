import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformDateToEpoch } from 'src/common/helper/decorators/transformDateToEpoch';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ComplianceTrackerResponse {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Expose()
  locationId: number;

  @Expose()
  complianceConfigId: number;

  @Expose()
  userId: number;

  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  dueDate: Date;

  @Expose()
  status: string;

  @Expose()
  activity: string;

  @Expose()
  doc?: string;

  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  complianceCompletionDate?: Date;

  @Expose()
  complianceCertificate?: string;

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
