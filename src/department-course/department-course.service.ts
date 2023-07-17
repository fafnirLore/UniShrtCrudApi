import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindDepartmentCourseDataPayloadDto } from './dto/find-department-course.dto';
import { DepartmentCourse } from './entities/department-course.entity';
import { DepartmentCourseHistory } from './entities/department-course-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllDepartmentCourseHistoryDataPayloadDto } from './dto/find-department-course-history.dto';

@Injectable()
export class DepartmentCourseService {
  constructor(
    @InjectRepository(DepartmentCourse)
    private readonly DepartmentCourseRepositry: Repository<DepartmentCourse>,
    @InjectRepository(DepartmentCourseHistory)
    private readonly DepartmentCourseHistoryRepositry: Repository<DepartmentCourseHistory>,
  ) {}
  async create(createDto: DepartmentCourse) {
    const res = await this.DepartmentCourseRepositry.save({
      ...createDto,
    });
    await this.DepartmentCourseHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.DepartmentCourseRepositry.find({
        where: { departmentCourseId: res?.departmentCourseId },
         relations: {departmentId: true, courseId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindDepartmentCourseDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
    sql += `DepartmentCourse.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.DepartmentCourseRepositry.createQueryBuilder('DepartmentCourse')
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

    const quer = await this.DepartmentCourseRepositry.createQueryBuilder('DepartmentCourse')
      .leftJoinAndSelect('DepartmentCourse.departmentId', 'departmentId')
.leftJoinAndSelect('DepartmentCourse.courseId', 'courseId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllDepartmentCourseHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `DepartmentCourseHistory.departmentCourseId = ${params?.departmentCourseId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.DepartmentCourseHistoryRepositry.createQueryBuilder(
      'DepartmentCourseHistory',
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

    const quer = await this.DepartmentCourseHistoryRepositry.createQueryBuilder(
      'DepartmentCourseHistory',
    )
      //.innerJoinAndSelect('DepartmentCourseHistory.departmentCourseTypeId', 'departmentCourseTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: DepartmentCourse) {
    const res = await this.DepartmentCourseRepositry.findOne({
      where: {
        departmentCourseId: params?.departmentCourseId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {departmentId: true, courseId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: DepartmentCourse) {
    const obj = await this.DepartmentCourseRepositry.find({
      where: {
        departmentCourseId: updatePayscaleDto?.departmentCourseId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {departmentId: true, courseId: true, },
    });
    if (obj.length > 0) {
      const res = await this.DepartmentCourseRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.DepartmentCourseHistoryRepositry.save({ ...res } as any);
      return await this.DepartmentCourseRepositry.find({
        where: { departmentCourseId: res?.departmentCourseId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: DepartmentCourse) {
    const res = await this.DepartmentCourseRepositry.findOne({
      where: {
        departmentCourseId: params?.departmentCourseId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.DepartmentCourseRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.DepartmentCourseHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
