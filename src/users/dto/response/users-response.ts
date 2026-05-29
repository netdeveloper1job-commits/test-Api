import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformDateToEpoch } from 'src/common/helper/decorators/transformDateToEpoch';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UserResponse {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  emailId: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  password: string;

  @Expose()
  designation: string;

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
