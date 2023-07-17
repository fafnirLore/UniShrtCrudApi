import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindFacultyDataPayloadDto } from './dto/find-faculty.dto';
import { Faculty } from './entities/faculty.entity';
import { FacultyHistory } from './entities/faculty-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllFacultyHistoryDataPayloadDto } from './dto/find-faculty-history.dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private readonly FacultyRepositry: Repository<Faculty>,
    @InjectRepository(FacultyHistory)
    private readonly FacultyHistoryRepositry: Repository<FacultyHistory>,
  ) {}
  async create(createDto: Faculty) {
    const res = await this.FacultyRepositry.save({
      ...createDto,
    });
    await this.FacultyHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.FacultyRepositry.find({
        where: { facultyId: res?.facultyId },
         relations: {courseFacultyId: true, departmentCourseId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindFacultyDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
	if (!isEmpty(params?.facultyName)) {
sql += `Faculty.facultyName like '%params?.facultyName%' AND `;
}
    sql += `Faculty.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.FacultyRepositry.createQueryBuilder('Faculty')
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

    const quer = await this.FacultyRepositry.createQueryBuilder('Faculty')
      .leftJoinAndSelect('Faculty.courseFacultyId', 'courseFacultyId')
.leftJoinAndSelect('Faculty.departmentCourseId', 'departmentCourseId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllFacultyHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `FacultyHistory.facultyId = ${params?.facultyId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.FacultyHistoryRepositry.createQueryBuilder(
      'FacultyHistory',
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

    const quer = await this.FacultyHistoryRepositry.createQueryBuilder(
      'FacultyHistory',
    )
      //.innerJoinAndSelect('FacultyHistory.facultyTypeId', 'facultyTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: Faculty) {
    const res = await this.FacultyRepositry.findOne({
      where: {
        facultyId: params?.facultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {courseFacultyId: true, departmentCourseId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: Faculty) {
    const obj = await this.FacultyRepositry.find({
      where: {
        facultyId: updatePayscaleDto?.facultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {courseFacultyId: true, departmentCourseId: true, },
    });
    if (obj.length > 0) {
      const res = await this.FacultyRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.FacultyHistoryRepositry.save({ ...res } as any);
      return await this.FacultyRepositry.find({
        where: { facultyId: res?.facultyId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: Faculty) {
    const res = await this.FacultyRepositry.findOne({
      where: {
        facultyId: params?.facultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.FacultyRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.FacultyHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
