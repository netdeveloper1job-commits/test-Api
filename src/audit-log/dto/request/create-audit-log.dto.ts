import { ApiProperty } from "@nestjs/swagger";

export class CreateAuditLogDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  loginTime: Date;

  @ApiProperty()
  loginStatus: string;

  @ApiProperty()
  ipAddress: string;

  @ApiProperty()
  deviceType: string;

  @ApiProperty()
  actionAccessed: string;

  @ApiProperty()
  logOutTime: Date;
}