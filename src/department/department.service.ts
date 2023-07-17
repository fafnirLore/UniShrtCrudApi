import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindDepartmentDataPayloadDto } from './dto/find-department.dto';
import { Department } from './entities/department.entity';
import { DepartmentHistory } from './entities/department-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllDepartmentHistoryDataPayloadDto } from './dto/find-department-history.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly DepartmentRepositry: Repository<Department>,
    @InjectRepository(DepartmentHistory)
    private readonly DepartmentHistoryRepositry: Repository<DepartmentHistory>,
  ) {}
  async create(createDto: Department) {
    const res = await this.DepartmentRepositry.save({
      ...createDto,
    });
    await this.DepartmentHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.DepartmentRepositry.find({
        where: { departmentId: res?.departmentId },
         relations: {departmentCourseId: true, departmentFacultyId: true, departmentStudentId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindDepartmentDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
	if (!isEmpty(params?.departmentName)) {
sql += `Department.departmentName like '%params?.departmentName%' AND `;
}
    sql += `Department.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.DepartmentRepositry.createQueryBuilder('Department')
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

    const quer = await this.DepartmentRepositry.createQueryBuilder('Department')
      .leftJoinAndSelect('Department.departmentCourseId', 'departmentCourseId')
.leftJoinAndSelect('Department.departmentFacultyId', 'departmentFacultyId')
.leftJoinAndSelect('Department.departmentStudentId', 'departmentStudentId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllDepartmentHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `DepartmentHistory.departmentId = ${params?.departmentId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.DepartmentHistoryRepositry.createQueryBuilder(
      'DepartmentHistory',
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

    const quer = await this.DepartmentHistoryRepositry.createQueryBuilder(
      'DepartmentHistory',
    )
      //.innerJoinAndSelect('DepartmentHistory.departmentTypeId', 'departmentTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: Department) {
    const res = await this.DepartmentRepositry.findOne({
      where: {
        departmentId: params?.departmentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {departmentCourseId: true, departmentFacultyId: true, departmentStudentId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: Department) {
    const obj = await this.DepartmentRepositry.find({
      where: {
        departmentId: updatePayscaleDto?.departmentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {departmentCourseId: true, departmentFacultyId: true, departmentStudentId: true, },
    });
    if (obj.length > 0) {
      const res = await this.DepartmentRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.DepartmentHistoryRepositry.save({ ...res } as any);
      return await this.DepartmentRepositry.find({
        where: { departmentId: res?.departmentId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: Department) {
    const res = await this.DepartmentRepositry.findOne({
      where: {
        departmentId: params?.departmentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.DepartmentRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.DepartmentHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
