import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('course_student_history')
export class CourseStudentHistory {
  
@PrimaryGeneratedColumn({name: 'course_student_histoy_id'})
coursenumberHistoryId?: number;
@Column({ name: 'course_student_id' })
  
  
  coursenumberId?: number;


  
  @Column({ name: 'student_id', type: "integer" })
  studentId: number;

  
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