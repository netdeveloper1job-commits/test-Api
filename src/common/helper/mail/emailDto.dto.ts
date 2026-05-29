import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {

  @ApiProperty({ type: Object, additionalProperties: { type: 'string' } })
  content: { [key: string]: string };

  @ApiProperty()
  to: string;

  @ApiProperty()
  reqData: string;

  @ApiProperty()
  userEmail?: string;

}

export class InvoiceEmailDto{
  @ApiProperty()
  content: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  reqData: string;

  @ApiProperty()
  salesPersonMailId?: string;
}

