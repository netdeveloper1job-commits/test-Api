import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamp', nullable: true })
  loginTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  logOutTime: Date;

  @Column({ default: 'SUCCESS' })
  loginStatus: string;

  @Column({ nullable: true })
  ipAddress: string;

  @Column({ nullable: true })
  deviceType: string;

  @Column()
  actionAccessed: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}