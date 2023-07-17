import {Department} from 'src/department/entities/department.entity'
import {Course} from 'src/course/entities/course.entity'
import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('department_course')
export class DepartmentCourse {
    @PrimaryGeneratedColumn({ name: 'department_course_id' })
    @IsNumber()
    @IsOptional()
    departmentCourseId?: number;


    @ManyToOne(() => Department, (d) => d.departmentId)
    @Column({ name: 'department_id', type: "integer" })
    departmentId: Department;

    @ManyToOne(() => Course, (c) => c.courseId)
    @Column({ name: 'course_id', type: "integer" })
    courseId: Course;

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}