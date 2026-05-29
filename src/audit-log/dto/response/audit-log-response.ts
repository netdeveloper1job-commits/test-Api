import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TransformDateToEpoch } from 'src/common/helper/decorators/transformDateToEpoch';

export class AuditLogResponse {

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  user_id: number;

  @ApiProperty()
  @Expose()
  loginTime: Date;

  @ApiProperty()
  @Expose()
  logOutTime: Date;

  @ApiProperty()
  @Expose()
  loginStatus: string;

  @ApiProperty()
  @Expose()
  ipAddress: string;

  @ApiProperty()
  @Expose()
  deviceType: string;

  @ApiProperty()
  @Expose()
  actionAccessed: string;

  @ApiPropertyOptional({ example: Date.now() / 1000 })
  @TransformDateToEpoch()
  @Expose()
  createdAt?: Date;
}