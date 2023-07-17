import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindDepartmentStudentDataPayloadDto } from './dto/find-department-student.dto';
import { DepartmentStudent } from './entities/department-student.entity';
import { DepartmentStudentHistory } from './entities/department-student-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllDepartmentStudentHistoryDataPayloadDto } from './dto/find-department-student-history.dto';

@Injectable()
export class DepartmentStudentService {
  constructor(
    @InjectRepository(DepartmentStudent)
    private readonly DepartmentStudentRepositry: Repository<DepartmentStudent>,
    @InjectRepository(DepartmentStudentHistory)
    private readonly DepartmentStudentHistoryRepositry: Repository<DepartmentStudentHistory>,
  ) {}
  async create(createDto: DepartmentStudent) {
    const res = await this.DepartmentStudentRepositry.save({
      ...createDto,
    });
    await this.DepartmentStudentHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.DepartmentStudentRepositry.find({
        where: { departmentStudentId: res?.departmentStudentId },
         relations: {studentId: true, departmentId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindDepartmentStudentDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
    sql += `DepartmentStudent.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.DepartmentStudentRepositry.createQueryBuilder('DepartmentStudent')
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

    const quer = await this.DepartmentStudentRepositry.createQueryBuilder('DepartmentStudent')
      .leftJoinAndSelect('DepartmentStudent.studentId', 'studentId')
.leftJoinAndSelect('DepartmentStudent.departmentId', 'departmentId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllDepartmentStudentHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `DepartmentStudentHistory.departmentStudentId = ${params?.departmentStudentId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.DepartmentStudentHistoryRepositry.createQueryBuilder(
      'DepartmentStudentHistory',
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

    const quer = await this.DepartmentStudentHistoryRepositry.createQueryBuilder(
      'DepartmentStudentHistory',
    )
      //.innerJoinAndSelect('DepartmentStudentHistory.departmentStudentTypeId', 'departmentStudentTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: DepartmentStudent) {
    const res = await this.DepartmentStudentRepositry.findOne({
      where: {
        departmentStudentId: params?.departmentStudentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {studentId: true, departmentId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: DepartmentStudent) {
    const obj = await this.DepartmentStudentRepositry.find({
      where: {
        departmentStudentId: updatePayscaleDto?.departmentStudentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {studentId: true, departmentId: true, },
    });
    if (obj.length > 0) {
      const res = await this.DepartmentStudentRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.DepartmentStudentHistoryRepositry.save({ ...res } as any);
      return await this.DepartmentStudentRepositry.find({
        where: { departmentStudentId: res?.departmentStudentId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: DepartmentStudent) {
    const res = await this.DepartmentStudentRepositry.findOne({
      where: {
        departmentStudentId: params?.departmentStudentId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.DepartmentStudentRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.DepartmentStudentHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
