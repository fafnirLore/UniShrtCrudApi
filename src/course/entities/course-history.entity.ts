import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('course_history')
export class CourseHistory {
    
@PrimaryGeneratedColumn({name: 'course_histoy_id'})
courseHistoryId?: number;
@Column({ name: 'course_id' })
    
    
    courseId?: number;

    @Column({ name: 'course_name' })
    
    name?: string

    
    
    @Column({ nullable: true, name: 'course_faculty_id', type: 'integer' })
    courseFacultyId: number;

    
    
    @Column({ nullable: true, name: 'course_student_id', type: 'integer' })
    courseStudentId: number;

    
    
    
    @Column({ nullable: true, name: 'department_course_id', type: 'integer' })
    departmentCourseId: number;

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}