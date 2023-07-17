import { Module } from '@nestjs/common';
import { DepartmentStudentService } from './department-student.service';
import { DepartmentStudentController } from './department-student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentStudent } from './entities/department-student.entity';
import { DepartmentStudentHistory } from './entities/department-student-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentStudent, DepartmentStudentHistory])],
  controllers: [DepartmentStudentController],
  providers: [DepartmentStudentService],
  exports: [DepartmentStudentService],
})
export class DepartmentStudentModule {}
