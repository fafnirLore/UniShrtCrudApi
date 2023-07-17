import { Module } from '@nestjs/common';
import { DepartmentFacultyService } from './department-faculty.service';
import { DepartmentFacultyController } from './department-faculty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentFaculty } from './entities/department-faculty.entity';
import { DepartmentFacultyHistory } from './entities/department-faculty-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentFaculty, DepartmentFacultyHistory])],
  controllers: [DepartmentFacultyController],
  providers: [DepartmentFacultyService],
  exports: [DepartmentFacultyService],
})
export class DepartmentFacultyModule {}
