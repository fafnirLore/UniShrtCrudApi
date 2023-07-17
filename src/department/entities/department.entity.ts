import {DepartmentCourse} from 'src/department-course/entities/department-course.entity'
import {DepartmentFaculty} from 'src/department-faculty/entities/department-faculty.entity'
import {DepartmentStudent} from 'src/department-student/entities/department-student.entity'
import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('department')
export class Department {
    @PrimaryGeneratedColumn({ name: 'department_id' })
    @IsNumber()
    @IsOptional()
    departmentId?: number;

    @Column({ name: 'department_name' })
    @IsString()
    departmentName?: string;

    @OneToMany(() => DepartmentCourse, (dc) => dc.departmentCourseId)
    @JoinColumn({ name: 'department_course_id' })
    @Column({  nullable: true,name: 'department_course_id', type: 'integer' })
    departmentCourseId: DepartmentCourse[];

    @OneToMany(() => DepartmentFaculty, (df) => df.departmentFacultyId)
    @JoinColumn({ name: 'department_faculty_id' })
    @Column({  nullable: true,name: 'department_faculty_id', type: 'integer' })
    departmentFacultyId: DepartmentFaculty[];

    @OneToMany(() => DepartmentStudent, (ds) => ds.departmentStudentId)
    @JoinColumn({ name: 'department_student_id' })
    @Column({ nullable: true, name: 'department_student_id', type: 'integer' })
    departmentStudentId: DepartmentStudent[];

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}