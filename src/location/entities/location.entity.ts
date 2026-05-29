import { InputDetail } from 'src/input-details/entities/input-detail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  address: string;

  @Column()
  industryTypeId: string;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    nullable: true,
    default: () => 'null',
  })
  updatedAt: Date;
  
@ManyToOne(() => InputDetail, (industry) => industry.locations)
@JoinColumn({ name: 'industryTypeId' })
industryType: InputDetail;

  
}
