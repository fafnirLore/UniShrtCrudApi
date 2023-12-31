import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentHistory } from './entities/student-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentHistory])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
