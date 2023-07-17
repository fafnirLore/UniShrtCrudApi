import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import 'reflect-metadata';

import { CourseFacultyModule } from './course-faculty/course-faculty.module';
import { CourseStudentModule } from './course-student/course-student.module';
import { CourseModule } from './course/course.module';
import { DepartmentCourseModule } from './department-course/department-course.module';
import { DepartmentFacultyModule } from './department-faculty/department-faculty.module';
import { DepartmentStudentModule } from './department-student/department-student.module';
import { DepartmentModule } from './department/department.module';
import { FacultyModule } from './faculty/faculty.module';
import { StudentModule } from './student/student.module';


dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
    CourseFacultyModule,CourseStudentModule,CourseModule,DepartmentCourseModule,DepartmentFacultyModule,DepartmentStudentModule,DepartmentModule,FacultyModule,StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
