import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business_roles_history')
export class BusinessRoleHistory {
  
  
  
@PrimaryGeneratedColumn({name: 'business_role_histoy_id'})
businessRoleHistoryId?: number;
@Column({ name: 'business_roles_id' })
  businessRoleId?: number;
  
  
  @Column({ nullable: true, name: 'title' })
  title?: string;
  
  
  @Column({ nullable: true, name: 'dml_status' })
  dmlStatus?: number;
  
  
  @Column({ nullable: true, name: 'user_id' })
  dmlUserId?: number;
  
  
  @Column({ nullable: true, name: 'type' })
  type?: string;
  
  
  @Column({ nullable: true, name: 'project_id', default: 0 })
  projectId?: number;
  
  
  @Column({ nullable: true, name: 'description' })
  description?: string;
  
  
  @Column({ nullable: true, name: 'client_id' })
  clientId?: number;
  
  
  @Column({ nullable: true, name: 'root_id' })
  
  
  rootId: number;
  @Column({ name: 'dml_username' })
  dmlUsername: string;
  @Column({ name: 'dml_timestamps', type: 'date' })
  dmlTimestamps: Date;
}
