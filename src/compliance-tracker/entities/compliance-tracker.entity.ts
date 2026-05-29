import { ComplianceCategory } from 'src/compliance-category/entities/compliance-category.entity';
import { ComplianceConfig } from 'src/compliance-config/entities/compliance-config.entity';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('compliance_trackers')
export class ComplianceTracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locationId: number;

  @Column()
  complianceConfigId: number;

  @Column()
  userId: number;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: ['Compliance', 'In Process', 'Overdue'] })
  status: string;

  @Column({ type: 'enum', enum: ['Applied', 'Not Applied', 'Compliant'] })
  activity: string;

  @Column({ nullable: true })
  doc: string;

  @Column({ nullable: true })
  complianceCategoryId: string;

  @Column({ type: 'date', nullable: true })
  complianceCompletionDate: Date;

  @Column({ nullable: true })
  complianceCertificate: string;

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

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  location: Location;


  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: false })
  reminderSent: boolean;

  @ManyToOne(() => ComplianceCategory, (category) => category.complianceTrackers)
@JoinColumn({ name: 'complianceCategoryId' })
complianceCategory: ComplianceCategory;

  @ManyToOne(() => ComplianceConfig)
  @JoinColumn({ name: 'complianceConfigId' })
  complianceConfig: ComplianceConfig;
}
