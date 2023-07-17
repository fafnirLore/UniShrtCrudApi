import { Module } from '@nestjs/common';
import { CourseStudentService } from './course-student.service';
import { CourseStudentController } from './course-student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseStudent } from './entities/course-student.entity';
import { CourseStudentHistory } from './entities/course-student-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseStudent, CourseStudentHistory])],
  controllers: [CourseStudentController],
  providers: [CourseStudentService],
  exports: [CourseStudentService],
})
export class CourseStudentModule {}
