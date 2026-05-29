import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { PrimaryGeneratedColumn } from "typeorm";

export class EventLogResponse{
    @PrimaryGeneratedColumn()
    @Expose()
    id:number;
    
    @ApiProperty()
    @Expose()
    moduleName:string;
    
    @ApiProperty()
    @Expose()
    eventName:string;
    
    @ApiProperty()
    @Expose()
    eventUserId:string;
    
    @ApiProperty()
    @Expose()
    eventUserName:string;
    
    @ApiProperty()
    @Expose()
    eventDateTime: Date;
    
    @ApiProperty()
    @Expose()
    oldValue:string;
    
    @ApiProperty()
    @Expose()
    newValue:string;

    @ApiProperty()
    @Expose()
    eventPrimeryKey:number;

}