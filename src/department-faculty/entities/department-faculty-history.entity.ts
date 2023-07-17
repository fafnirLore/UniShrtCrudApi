import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_faculty_history')
export class DepartmentFacultyHistory {
    
@PrimaryGeneratedColumn({name: 'department_faculty_histoy_id'})
departmentnumberHistoryId?: number;
@Column({ name: 'department_faculty_id' })
    
        
    departmentnumberId?: number;


    
    @Column({ name: 'faculty_id' ,type:"integer"})
    facultyId: number;

    
    @Column({ name: 'department_id',type:"integer" })
    departmentId: number;

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}