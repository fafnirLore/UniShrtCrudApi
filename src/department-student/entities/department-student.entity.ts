import {Student} from 'src/student/entities/student.entity'
import {Department} from 'src/department/entities/department.entity'
import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_student')
export class DepartmentStudent {
    @PrimaryGeneratedColumn({ name: 'department_student_id' })
    @IsNumber()
    @IsOptional()
    departmentStudentId?: number;


    @ManyToOne(() => Student, (s) => s.studentId)
    @Column({ name: 'student_id', type: "integer" })
    studentId: Student;

    @ManyToOne(() => Department, (d) => d.departmentId)
    @Column({ name: 'department_id', type: "integer" })
    departmentId: Department;

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}