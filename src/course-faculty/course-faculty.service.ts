import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindCourseFacultyDataPayloadDto } from './dto/find-course-faculty.dto';
import { CourseFaculty } from './entities/course-faculty.entity';
import { CourseFacultyHistory } from './entities/course-faculty-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllCourseFacultyHistoryDataPayloadDto } from './dto/find-course-faculty-history.dto';

@Injectable()
export class CourseFacultyService {
  constructor(
    @InjectRepository(CourseFaculty)
    private readonly CourseFacultyRepositry: Repository<CourseFaculty>,
    @InjectRepository(CourseFacultyHistory)
    private readonly CourseFacultyHistoryRepositry: Repository<CourseFacultyHistory>,
  ) {}
  async create(createDto: CourseFaculty) {
    const res = await this.CourseFacultyRepositry.save({
      ...createDto,
    });
    await this.CourseFacultyHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.CourseFacultyRepositry.find({
        where: { courseFacultyId: res?.courseFacultyId },
         relations: {facultyId: true, courseId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindCourseFacultyDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
    sql += `CourseFaculty.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.CourseFacultyRepositry.createQueryBuilder('CourseFaculty')
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

    const quer = await this.CourseFacultyRepositry.createQueryBuilder('CourseFaculty')
      .leftJoinAndSelect('CourseFaculty.facultyId', 'facultyId')
.leftJoinAndSelect('CourseFaculty.courseId', 'courseId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllCourseFacultyHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `CourseFacultyHistory.courseFacultyId = ${params?.courseFacultyId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.CourseFacultyHistoryRepositry.createQueryBuilder(
      'CourseFacultyHistory',
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

    const quer = await this.CourseFacultyHistoryRepositry.createQueryBuilder(
      'CourseFacultyHistory',
    )
      //.innerJoinAndSelect('CourseFacultyHistory.courseFacultyTypeId', 'courseFacultyTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: CourseFaculty) {
    const res = await this.CourseFacultyRepositry.findOne({
      where: {
        courseFacultyId: params?.courseFacultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {facultyId: true, courseId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: CourseFaculty) {
    const obj = await this.CourseFacultyRepositry.find({
      where: {
        courseFacultyId: updatePayscaleDto?.courseFacultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {facultyId: true, courseId: true, },
    });
    if (obj.length > 0) {
      const res = await this.CourseFacultyRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.CourseFacultyHistoryRepositry.save({ ...res } as any);
      return await this.CourseFacultyRepositry.find({
        where: { courseFacultyId: res?.courseFacultyId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: CourseFaculty) {
    const res = await this.CourseFacultyRepositry.findOne({
      where: {
        courseFacultyId: params?.courseFacultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.CourseFacultyRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.CourseFacultyHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
