import { ComplianceCategory } from 'src/compliance-category/entities/compliance-category.entity';
import { Location } from 'src/location/entities/location.entity';
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

@Entity('input_details')
export class InputDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attributeType: string;

  @Column()
  attributeName: string;

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

   @OneToMany(() => Location, (location) => location.industryType)
  locations: Location[];

  // ✅ ONE INDUSTRY → MANY COMPLIANCE CATEGORIES
  @OneToMany(
    () => ComplianceCategory,
    (category) => category.industryType,
  )
  complianceCategories: ComplianceCategory[];
}

