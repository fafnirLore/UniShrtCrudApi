import { Module } from '@nestjs/common';
import { DepartmentCourseService } from './department-course.service';
import { DepartmentCourseController } from './department-course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentCourse } from './entities/department-course.entity';
import { DepartmentCourseHistory } from './entities/department-course-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentCourse, DepartmentCourseHistory])],
  controllers: [DepartmentCourseController],
  providers: [DepartmentCourseService],
  exports: [DepartmentCourseService],
})
export class DepartmentCourseModule {}
