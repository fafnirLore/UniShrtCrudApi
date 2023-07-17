import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('department_history')
export class DepartmentHistory {
    
@PrimaryGeneratedColumn({name: 'department_histoy_id'})
departmentHistoryId?: number;
@Column({ name: 'department_id' })
    
    
    departmentId?: number;

    @Column({ name: 'department_name' })
    
    departmentName?: string;

    
    
    @Column({  nullable: true,name: 'department_course_id', type: 'integer' })
    departmentCourseId: number;

    
    
    @Column({  nullable: true,name: 'department_faculty_id', type: 'integer' })
    departmentFacultyId: number;

    
    
    @Column({ nullable: true, name: 'department_student_id', type: 'integer' })
    departmentStudentId: number;

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}