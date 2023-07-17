import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_student_history')
export class DepartmentStudentHistory {
    
@PrimaryGeneratedColumn({name: 'department_student_histoy_id'})
departmentnumberHistoryId?: number;
@Column({ name: 'department_student_id' })
    
    
    departmentnumberId?: number;


    
    @Column({ name: 'student_id', type: "integer" })
    studentId: number;

    
    @Column({ name: 'department_id', type: "integer" })
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