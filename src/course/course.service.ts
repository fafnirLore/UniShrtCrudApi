import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindCourseDataPayloadDto } from './dto/find-course.dto';
import { Course } from './entities/course.entity';
import { CourseHistory } from './entities/course-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllCourseHistoryDataPayloadDto } from './dto/find-course-history.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly CourseRepositry: Repository<Course>,
    @InjectRepository(CourseHistory)
    private readonly CourseHistoryRepositry: Repository<CourseHistory>,
  ) {}
  async create(createDto: Course) {
    const res = await this.CourseRepositry.save({
      ...createDto,
    });
    await this.CourseHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.CourseRepositry.find({
        where: { courseId: res?.courseId },
         relations: {courseFacultyId: true, courseStudentId: true, departmentCourseId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindCourseDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
    sql += `Course.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.CourseRepositry.createQueryBuilder('Course')
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

    const quer = await this.CourseRepositry.createQueryBuilder('Course')
      .leftJoinAndSelect('Course.courseFacultyId', 'courseFacultyId')
.leftJoinAndSelect('Course.courseStudentId', 'courseStudentId')
.leftJoinAndSelect('Course.departmentCourseId', 'departmentCourseId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllCourseHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `CourseHistory.courseId = ${params?.courseId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.CourseHistoryRepositry.createQueryBuilder(
      'CourseHistory',
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

    const quer = await this.CourseHistoryRepositry.createQueryBuilder(
      'CourseHistory',
    )
      //.innerJoinAndSelect('CourseHistory.courseTypeId', 'courseTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: Course) {
    const res = await this.CourseRepositry.findOne({
      where: {
        courseId: params?.courseId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {courseFacultyId: true, courseStudentId: true, departmentCourseId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: Course) {
    const obj = await this.CourseRepositry.find({
      where: {
        courseId: updatePayscaleDto?.courseId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {courseFacultyId: true, courseStudentId: true, departmentCourseId: true, },
    });
    if (obj.length > 0) {
      const res = await this.CourseRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.CourseHistoryRepositry.save({ ...res } as any);
      return await this.CourseRepositry.find({
        where: { courseId: res?.courseId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: Course) {
    const res = await this.CourseRepositry.findOne({
      where: {
        courseId: params?.courseId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.CourseRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.CourseHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
