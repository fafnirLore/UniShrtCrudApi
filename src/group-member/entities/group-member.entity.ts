import {BusinessRole} from 'src/business-role/entities/business-role.entity'
import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('group_members')
export class GroupMember {
  @PrimaryGeneratedColumn({ name: 'group_member_id' })
  @IsOptional()
  @IsNumber()
  groupMemberId?: number;

  @Column({ nullable: true, name: 'dml_status' })
  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @ManyToOne(() => BusinessRole, (br) => br.businessRoleId)
  @JoinColumn({ name: 'business_role_id' })
  @Column({ nullable: true, name: 'business_role_id' })
  @IsNumber()
  @IsOptional()
  businessRoleId: BusinessRole;

  @Column({ nullable: true, name: 'project_id' })
  @IsNumber()
  @IsOptional()
  projectId: number;

  @Column({ name: 'dml_username' })
  dmlUsername: string;

  @Column({ name: 'dml_user_id' })
  dmlUserId: number;

  @Column({ name: 'dml_timestamps', type: 'date' })
  dmlTimestamps: Date;
}
