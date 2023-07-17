import { Module } from '@nestjs/common';
import { CourseFacultyService } from './course-faculty.service';
import { CourseFacultyController } from './course-faculty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseFaculty } from './entities/course-faculty.entity';
import { CourseFacultyHistory } from './entities/course-faculty-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseFaculty, CourseFacultyHistory])],
  controllers: [CourseFacultyController],
  providers: [CourseFacultyService],
  exports: [CourseFacultyService],
})
export class CourseFacultyModule {}
