import { ComplianceCategory } from 'src/compliance-category/entities/compliance-category.entity';
import { ComplianceTracker } from 'src/compliance-tracker/entities/compliance-tracker.entity';
import { InputDetail } from 'src/input-details/entities/input-detail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('compliance_configs')
export class ComplianceConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  industryTypeId: number;

  @Column()
  complianceCategoryId: number;

  @Column()
  complianceItem: string;

  @Column()
  riskCategory: string;

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

  @ManyToOne(() => InputDetail)
  @JoinColumn({ name: 'industryTypeId' })
  industryType: InputDetail;

  @ManyToOne(() => ComplianceCategory)
  @JoinColumn({ name: 'complianceCategoryId' })
  complianceCategory: ComplianceCategory;

  @OneToMany(() => ComplianceTracker, (tracker) => tracker.complianceCategory)
  complianceTrackers: ComplianceTracker[]; 

    @OneToMany(() => ComplianceTracker, (tracker) => tracker.complianceConfig)
complianceConfig: ComplianceTracker[];
}

