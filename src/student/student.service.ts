import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindStudentDataPayloadDto } from './dto/find-student.dto';
import { Student } from './entities/student.entity';
import { StudentHistory } from './entities/student-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllStudentHistoryDataPayloadDto } from './dto/find-student-history.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly StudentRepositry: Repository<Student>,
    @InjectRepository(StudentHistory)
    private readonly StudentHistoryRepositry: Repository<StudentHistory>,
  ) {}
  async create(createDto: Student) {
    const res = await this.StudentRepositry.save({
      ...createDto,
    });
    await this.StudentHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.StudentRepositry.find({
        where: { studentId: res?.studentId },
         relations: {courseStudentId: true, departmentStudentId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindStudentDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
	if (!isEmpty(params?.studentName)) {
sql += `Student.studentName like '%params?.studentName%' AND `;
}
    sql += `Student.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.StudentRepositry.createQueryBuilder('Student')
      .where(sql)
      .getCount();
    if (
      !isEmpty(pagination) &&
      pagination?.pageNo >= 0 &&
      pagination?.itemsPerPage > 0
    ) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const quer = await this.StudentRepositry.createQueryBuilder('Student')
      .leftJoinAndSelect('Student.courseStudentId', 'courseStudentId')
.leftJoinAndSelect('Student.departmentStudentId', 'departmentStudentId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllStudentHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `StudentHistory.studentId = ${params?.studentId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.StudentHistoryRepositry.createQueryBuilder(
      'StudentHistory',
    )
      .where(sql)
      .getCount();
    if (
      !isEmpty(pagination) &&
      pagination?.pageNo >= 0 &&
      pagination?.itemsPerPage > 0
    ) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const quer = await this.StudentHistoryRepositry.createQueryBuilder(
      'StudentHistory',
    )
      //.innerJoinAndSelect('StudentHistory.studentTypeId', 'studentTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: Student) {
    const res = await this.StudentRepositry.findOne({
      where: {
        studentId: params?.studentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {courseStudentId: true, departmentStudentId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: Student) {
    const obj = await this.StudentRepositry.find({
      where: {
        studentId: updatePayscaleDto?.studentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {courseStudentId: true, departmentStudentId: true, },
    });
    if (obj.length > 0) {
      const res = await this.StudentRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.StudentHistoryRepositry.save({ ...res } as any);
      return await this.StudentRepositry.find({
        where: { studentId: res?.studentId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: Student) {
    const res = await this.StudentRepositry.findOne({
      where: {
        studentId: params?.studentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.StudentRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.StudentHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
