import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class userModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  emailId: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  userType: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: userModel;
}
