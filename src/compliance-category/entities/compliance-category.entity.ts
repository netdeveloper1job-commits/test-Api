import { ComplianceConfig } from 'src/compliance-config/entities/compliance-config.entity';
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

@Entity('compliance_categories')
export class ComplianceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  industryTypeId: number;

  @Column()
  complianceCategoryName: string;

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

  @OneToMany(() => ComplianceConfig, (config) => config.complianceCategory)
complianceConfigs: ComplianceConfig[];

@OneToMany(() => ComplianceTracker, (tracker) => tracker.complianceCategory)
complianceTrackers: ComplianceTracker[];
}

