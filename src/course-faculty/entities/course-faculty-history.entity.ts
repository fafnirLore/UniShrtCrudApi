import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('course_faculty_history')
export class CourseFacultyHistory {
  
@PrimaryGeneratedColumn({name: 'course_faculty_histoy_id'})
coursenumberHistoryId?: number;
@Column({ name: 'course_faculty_id' })
  
  
  coursenumberId?: number;

  
  @Column({ name: 'faculty_id', type: "integer" })
  facultyId: number;

  
  @Column({ name: 'course_id', type: "integer" })
  courseId: number;

  @Column({ name: 'dml_status' })
  dmlStatus: number;
  @Column({ name: 'dml_username' })
  dmlUsername: string;
  @Column({ name: 'dml_user_id' })
  dmlUserId: number;
  @Column({ name: 'dml_timestamps', type: 'date' })
  dmlTimestamps: Date;
}

