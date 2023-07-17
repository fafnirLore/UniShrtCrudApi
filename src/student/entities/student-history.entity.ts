import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm';

@Entity('student_history')
export class StudentHistory {
    
@PrimaryGeneratedColumn({name: 'student_histoy_id'})
studentHistoryId?: number;
@Column({ name: 'student_id' })
    
    
    studentId?: number;

    @Column({ name: 'student_name' })
    
    
    studentName?: string;

    
    
    @Column({ nullable: true, name: 'course_student_id', type: 'integer' })
    
    courseStudentId: number;

    
    
    @Column({ nullable: true, name: 'department_course_id', type: 'integer' })
    
    departmentStudentId: number;

    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}