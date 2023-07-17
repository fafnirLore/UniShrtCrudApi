import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('faculty_history')
export class FacultyHistory {
    
@PrimaryGeneratedColumn({name: 'faculty_histoy_id'})
facultyHistoryId?: number;
@Column({ name: 'faculty_id' })
    
    
    facultyId?: number;

    @Column({ name: 'faculty_name' })
    
    facultyName?: string;

    
    
    @Column({ nullable: true, name: 'course_faculty_id', type: 'integer' })
    courseFacultyId: number;

    
    
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