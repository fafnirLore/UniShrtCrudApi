import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindCourseStudentDataPayloadDto } from './dto/find-course-student.dto';
import { CourseStudent } from './entities/course-student.entity';
import { CourseStudentHistory } from './entities/course-student-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllCourseStudentHistoryDataPayloadDto } from './dto/find-course-student-history.dto';

@Injectable()
export class CourseStudentService {
  constructor(
    @InjectRepository(CourseStudent)
    private readonly CourseStudentRepositry: Repository<CourseStudent>,
    @InjectRepository(CourseStudentHistory)
    private readonly CourseStudentHistoryRepositry: Repository<CourseStudentHistory>,
  ) {}
  async create(createDto: CourseStudent) {
    const res = await this.CourseStudentRepositry.save({
      ...createDto,
    });
    await this.CourseStudentHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.CourseStudentRepositry.find({
        where: { courseStudentId: res?.courseStudentId },
         relations: {studentId: true, courseId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindCourseStudentDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
    sql += `CourseStudent.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.CourseStudentRepositry.createQueryBuilder('CourseStudent')
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

    const quer = await this.CourseStudentRepositry.createQueryBuilder('CourseStudent')
      .leftJoinAndSelect('CourseStudent.studentId', 'studentId')
.leftJoinAndSelect('CourseStudent.courseId', 'courseId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllCourseStudentHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `CourseStudentHistory.courseStudentId = ${params?.courseStudentId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.CourseStudentHistoryRepositry.createQueryBuilder(
      'CourseStudentHistory',
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

    const quer = await this.CourseStudentHistoryRepositry.createQueryBuilder(
      'CourseStudentHistory',
    )
      //.innerJoinAndSelect('CourseStudentHistory.courseStudentTypeId', 'courseStudentTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: CourseStudent) {
    const res = await this.CourseStudentRepositry.findOne({
      where: {
        courseStudentId: params?.courseStudentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {studentId: true, courseId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: CourseStudent) {
    const obj = await this.CourseStudentRepositry.find({
      where: {
        courseStudentId: updatePayscaleDto?.courseStudentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {studentId: true, courseId: true, },
    });
    if (obj.length > 0) {
      const res = await this.CourseStudentRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.CourseStudentHistoryRepositry.save({ ...res } as any);
      return await this.CourseStudentRepositry.find({
        where: { courseStudentId: res?.courseStudentId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: CourseStudent) {
    const res = await this.CourseStudentRepositry.findOne({
      where: {
        courseStudentId: params?.courseStudentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.CourseStudentRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.CourseStudentHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
