import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('business_roles')
export class BusinessRole {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'business_roles_id' })
  businessRoleId?: number;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, name: 'title' })
  title?: string;

  @IsOptional()
  @IsNumber()
  @Column({ nullable: true, name: 'dml_status' })
  dmlStatus?: number;


  @IsNumber()
  @IsOptional()
  @Column({ nullable: true, name: 'user_id' })
  dmlUserId?: number;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, name: 'type' })
  type?: string;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true, name: 'project_id', default: 0 })
  projectId?: number;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, name: 'description' })
  description?: string;

  @IsNumber()
  @IsOptional()
  @Column({ nullable: true, name: 'client_id' })
  clientId?: number;

  @ManyToOne(() => BusinessRole, (BusinessRole) => BusinessRole.businessRoleId)
  @JoinColumn({ name: 'root_id' })
  @Column({ nullable: true, name: 'root_id' })
  @IsNumber()
  @IsOptional()
  rootId: BusinessRole;

  @Column({ name: 'dml_username' })
  dmlUsername: string;

  @Column({ name: 'dml_timestamps', type: 'date' })
  dmlTimestamps: Date;
}
