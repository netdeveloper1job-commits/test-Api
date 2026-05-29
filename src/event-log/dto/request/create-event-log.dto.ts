import { ApiProperty } from "@nestjs/swagger";

export class CreateEventLogDto {
    @ApiProperty()
    moduleName?:string;

    @ApiProperty()
    eventName?:string;

    @ApiProperty()
    eventUserId?:string;

    @ApiProperty()
    eventUserName?:string;

    @ApiProperty()
    eventDateTime?: Date;

    @ApiProperty()
    oldValue?:string;

    @ApiProperty()
    newValue?:string;

    @ApiProperty()
    eventPrimeryKey?:number;

}
