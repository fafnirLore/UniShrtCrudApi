import {CourseFaculty} from 'src/course-faculty/entities/course-faculty.entity'
import {CourseStudent} from 'src/course-student/entities/course-student.entity'
import {DepartmentCourse} from 'src/department-course/entities/department-course.entity'
import { IsOptional, IsNumber, IsString } from 'class-validator';

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('course')
export class Course {
    @PrimaryGeneratedColumn({ name: 'course_id' })
    @IsNumber()
    @IsOptional()
    courseId?: number;

    @Column({ name: 'course_name' })
    @IsString()
    name?: string

    @OneToMany(() => CourseFaculty, (cf) => cf.courseFacultyId)
    @JoinColumn({ name: 'course_faculty_id' })
    @Column({ nullable: true, name: 'course_faculty_id', type: 'integer' })
    courseFacultyId: CourseFaculty[];

    @OneToMany(() => CourseStudent, (cs) => cs.courseStudentId)
    @JoinColumn({ name: 'course_student_id' })
    @Column({ nullable: true, name: 'course_student_id', type: 'integer' })
    courseStudentId: CourseStudent[];

    @OneToMany(() => DepartmentCourse, (dc) => dc.departmentCourseId)
    @IsNumber()
    @JoinColumn({ name: 'department_course_id' })
    @Column({ nullable: true, name: 'department_course_id', type: 'integer' })
    departmentCourseId: DepartmentCourse[];

    @Column({ name: 'dml_status' })
    dmlStatus: number;
    @Column({ name: 'dml_username' })
    dmlUsername: string;
    @Column({ name: 'dml_user_id' })
    dmlUserId: number;
    @Column({ name: 'dml_timestamps', type: 'date' })
    dmlTimestamps: Date;
}