import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_course_history')
export class DepartmentCourseHistory {
    
@PrimaryGeneratedColumn({name: 'department_course_histoy_id'})
departmentnumberHistoryId?: number;
@Column({ name: 'department_course_id' })
    
    
    departmentnumberId?: number;


    
    @Column({ name: 'department_id', type: "integer" })
    departmentId: number;

    
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