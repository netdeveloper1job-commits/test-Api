import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileUploadEnum } from './file-upload';

@Entity('file-upload')
export class FileUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  schedulingId: number;

  @Column({ default: FileUploadEnum.SAMPLE })
  fileType: FileUploadEnum;

  @Column()
  actualFileName: string;

  @Column()
  filePath: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'createdDate' })
  createdDate: Date;

  @Column({ nullable: true })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updatedDate',
    nullable: true,
    default: () => 'null',
  })
  updatedDate: Date;

  @Column({ nullable: true })
  updatedBy: string;

// @ManyToOne(() => Scheduling, scheduling => scheduling.fileUploads)
//  onDelete: 'CASCADE'
// @JoinColumn({ name: 'scheduleId' })
// scheduling: Scheduling;

}
