import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindBusinessRoleDataPayloadDto } from './dto/find-business-role.dto';
import { BusinessRole } from './entities/business-role.entity';
import { BusinessRoleHistory } from './entities/business-role-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllBusinessRoleHistoryDataPayloadDto } from './dto/find-business-role-history.dto';

@Injectable()
export class BusinessRoleService {
  constructor(
    @InjectRepository(BusinessRole)
    private readonly BusinessRoleRepositry: Repository<BusinessRole>,
    @InjectRepository(BusinessRoleHistory)
    private readonly BusinessRoleHistoryRepositry: Repository<BusinessRoleHistory>,
  ) {}
  async create(createDto: BusinessRole) {
    const res = await this.BusinessRoleRepositry.save({
      ...createDto,
    });
    await this.BusinessRoleHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.BusinessRoleRepositry.find({
        where: { businessRoleId: res?.businessRoleId },
         relations: {rootId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindBusinessRoleDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
	if (!isEmpty(params?.title)) {
sql += `BusinessRole.title like '%params?.title%' AND `;
}
	if (!isEmpty(params?.type)) {
sql += `BusinessRole.type like '%params?.type%' AND `;
}
	if (Number(params?.projectId) > 0) {
sql += `BusinessRole.projectId = params?.projectId AND `;
}
	if (!isEmpty(params?.description)) {
sql += `BusinessRole.description like '%params?.description%' AND `;
}
	if (Number(params?.clientId) > 0) {
sql += `BusinessRole.clientId = params?.clientId AND `;
}
    sql += `BusinessRole.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.BusinessRoleRepositry.createQueryBuilder('BusinessRole')
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

    const quer = await this.BusinessRoleRepositry.createQueryBuilder('BusinessRole')
      .leftJoinAndSelect('BusinessRole.rootId', 'rootId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllBusinessRoleHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `BusinessRoleHistory.businessRoleId = ${params?.businessRoleId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.BusinessRoleHistoryRepositry.createQueryBuilder(
      'BusinessRoleHistory',
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

    const quer = await this.BusinessRoleHistoryRepositry.createQueryBuilder(
      'BusinessRoleHistory',
    )
      //.innerJoinAndSelect('BusinessRoleHistory.businessRoleTypeId', 'businessRoleTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: BusinessRole) {
    const res = await this.BusinessRoleRepositry.findOne({
      where: {
        businessRoleId: params?.businessRoleId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {rootId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: BusinessRole) {
    const obj = await this.BusinessRoleRepositry.find({
      where: {
        businessRoleId: updatePayscaleDto?.businessRoleId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {rootId: true, },
    });
    if (obj.length > 0) {
      const res = await this.BusinessRoleRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.BusinessRoleHistoryRepositry.save({ ...res } as any);
      return await this.BusinessRoleRepositry.find({
        where: { businessRoleId: res?.businessRoleId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: BusinessRole) {
    const res = await this.BusinessRoleRepositry.findOne({
      where: {
        businessRoleId: params?.businessRoleId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.BusinessRoleRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.BusinessRoleHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
