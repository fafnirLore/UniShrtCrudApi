import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('group_members_history')
export class GroupMemberHistory {
  
@PrimaryGeneratedColumn({name: 'group_member_histoy_id'})
groupMemberHistoryId?: number;
@Column({ name: 'group_member_id' })
  
  
  groupMemberId?: number;
  @Column({ nullable: true, name: 'dml_status' })
  
  
  dmlStatus?: number;
  
  
  @Column({ nullable: true, name: 'business_role_id' })
  
  
  businessRoleId: number;
  @Column({ nullable: true, name: 'project_id' })
  
  
  projectId: number;
  @Column({ name: 'dml_username' })
  dmlUsername: string;
  @Column({ name: 'dml_user_id' })
  dmlUserId: number;
  @Column({ name: 'dml_timestamps', type: 'date' })
  dmlTimestamps: Date;
}
