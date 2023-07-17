import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindDepartmentFacultyDataPayloadDto } from './dto/find-department-faculty.dto';
import { DepartmentFaculty } from './entities/department-faculty.entity';
import { DepartmentFacultyHistory } from './entities/department-faculty-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllDepartmentFacultyHistoryDataPayloadDto } from './dto/find-department-faculty-history.dto';

@Injectable()
export class DepartmentFacultyService {
  constructor(
    @InjectRepository(DepartmentFaculty)
    private readonly DepartmentFacultyRepositry: Repository<DepartmentFaculty>,
    @InjectRepository(DepartmentFacultyHistory)
    private readonly DepartmentFacultyHistoryRepositry: Repository<DepartmentFacultyHistory>,
  ) {}
  async create(createDto: DepartmentFaculty) {
    const res = await this.DepartmentFacultyRepositry.save({
      ...createDto,
    });
    await this.DepartmentFacultyHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.DepartmentFacultyRepositry.find({
        where: { departmentFacultyId: res?.departmentFacultyId },
         relations: {facultyId: true, departmentId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindDepartmentFacultyDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
    sql += `DepartmentFaculty.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.DepartmentFacultyRepositry.createQueryBuilder('DepartmentFaculty')
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

    const quer = await this.DepartmentFacultyRepositry.createQueryBuilder('DepartmentFaculty')
      .leftJoinAndSelect('DepartmentFaculty.facultyId', 'facultyId')
.leftJoinAndSelect('DepartmentFaculty.departmentId', 'departmentId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllDepartmentFacultyHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `DepartmentFacultyHistory.departmentFacultyId = ${params?.departmentFacultyId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.DepartmentFacultyHistoryRepositry.createQueryBuilder(
      'DepartmentFacultyHistory',
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

    const quer = await this.DepartmentFacultyHistoryRepositry.createQueryBuilder(
      'DepartmentFacultyHistory',
    )
      //.innerJoinAndSelect('DepartmentFacultyHistory.departmentFacultyTypeId', 'departmentFacultyTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: DepartmentFaculty) {
    const res = await this.DepartmentFacultyRepositry.findOne({
      where: {
        departmentFacultyId: params?.departmentFacultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {facultyId: true, departmentId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: DepartmentFaculty) {
    const obj = await this.DepartmentFacultyRepositry.find({
      where: {
        departmentFacultyId: updatePayscaleDto?.departmentFacultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {facultyId: true, departmentId: true, },
    });
    if (obj.length > 0) {
      const res = await this.DepartmentFacultyRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.DepartmentFacultyHistoryRepositry.save({ ...res } as any);
      return await this.DepartmentFacultyRepositry.find({
        where: { departmentFacultyId: res?.departmentFacultyId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: DepartmentFaculty) {
    const res = await this.DepartmentFacultyRepositry.findOne({
      where: {
        departmentFacultyId: params?.departmentFacultyId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.DepartmentFacultyRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.DepartmentFacultyHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
