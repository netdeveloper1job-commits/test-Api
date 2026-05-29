import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ({name: 'event-log'})
export class EventLog {
    @PrimaryGeneratedColumn()
    id:number;
 
    @Column({nullable:true})
    moduleName:string;
 
    @Column({nullable:true})
    eventName:string;
 
    @Column({nullable:true})
    eventUserId:string;
 
    @Column({nullable:true})
    eventUserName:string;
 
    @Column({nullable:true})
    eventDateTime: Date;
 
    @Column({type: 'longtext'})
    oldValue:string;
 
    @Column({nullable:true,type: 'longtext'})
    newValue:string;
 
    @Column({nullable:true})
    eventPrimeryKey:number;

}
 

