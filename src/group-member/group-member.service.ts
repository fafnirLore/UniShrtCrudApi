import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { FindGroupMemberDataPayloadDto } from './dto/find-group-member.dto';
import { GroupMember } from './entities/group-member.entity';
import { GroupMemberHistory } from './entities/group-member-history.entity';
import { BadRequestException } from '@nestjs/common/exceptions';
import { paginationDto } from 'src/utils/commonDtos.dto';

import {
  DML_STATUS_DELETE,
  DML_STATUS_INSERT,
  DML_STATUS_UPDATE,
} from 'src/utils/constants';
import { FindAllGroupMemberHistoryDataPayloadDto } from './dto/find-group-member-history.dto';

@Injectable()
export class GroupMemberService {
  constructor(
    @InjectRepository(GroupMember)
    private readonly GroupMemberRepositry: Repository<GroupMember>,
    @InjectRepository(GroupMemberHistory)
    private readonly GroupMemberHistoryRepositry: Repository<GroupMemberHistory>,
  ) {}
  async create(createDto: GroupMember) {
    const res = await this.GroupMemberRepositry.save({
      ...createDto,
    });
    await this.GroupMemberHistoryRepositry.save({ ...res } as any);
    if (res) {
      return await this.GroupMemberRepositry.find({
        where: { groupMemberId: res?.groupMemberId },
         relations: {businessRoleId: true, },
      });
    } else {
      throw new BadRequestException();
    }
  }
  async findAll(params: FindGroupMemberDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    
    

    
	if (Number(params?.projectId) > 0) {
sql += `GroupMember.projectId = params?.projectId AND `;
}
    sql += `GroupMember.dmlStatus != ${DML_STATUS_DELETE} ORDER BY 1 DESC`;
    const count = await this.GroupMemberRepositry.createQueryBuilder('GroupMember')
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

    const quer = await this.GroupMemberRepositry.createQueryBuilder('GroupMember')
      .leftJoinAndSelect('GroupMember.businessRoleId', 'businessRoleId')

      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findAllHistory(
    params: FindAllGroupMemberHistoryDataPayloadDto,
    pagination: paginationDto,
  ) {
    let sql = `GroupMemberHistory.groupMemberId = ${params?.groupMemberId} `;
    sql += `ORDER BY 1 DESC`;
    const count = await this.GroupMemberHistoryRepositry.createQueryBuilder(
      'GroupMemberHistory',
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

    const quer = await this.GroupMemberHistoryRepositry.createQueryBuilder(
      'GroupMemberHistory',
    )
      //.innerJoinAndSelect('GroupMemberHistory.groupMemberTypeId', 'groupMemberTypeId')
      .where(sql)
      .getMany();
    return count ? [quer, count] : [];
  }
  async findOne(params: GroupMember) {
    const res = await this.GroupMemberRepositry.findOne({
      where: {
        groupMemberId: params?.groupMemberId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {businessRoleId: true, },
    });
    if (res) {
      return res;
    } else {
      throw new NotFoundException();
    }
  }

  async update(updatePayscaleDto: GroupMember) {
    const obj = await this.GroupMemberRepositry.find({
      where: {
        groupMemberId: updatePayscaleDto?.groupMemberId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
       relations: {businessRoleId: true, },
    });
    if (obj.length > 0) {
      const res = await this.GroupMemberRepositry.save({
        ...updatePayscaleDto,
        dmlStatus: DML_STATUS_UPDATE,
      });
      await this.GroupMemberHistoryRepositry.save({ ...res } as any);
      return await this.GroupMemberRepositry.find({
        where: { groupMemberId: res?.groupMemberId },
      });
    } else {
      throw new NotFoundException();
    }
  }

  async remove(params: GroupMember) {
    const res = await this.GroupMemberRepositry.findOne({
      where: {
        groupMemberId: params?.groupMemberId,
        dmlStatus: Not(DML_STATUS_DELETE),
      },
    });
    if (res) {
      const updatedObj = await this.GroupMemberRepositry.save({
        ...res,
        dmlStatus: DML_STATUS_DELETE,
        dmlUserId: params?.dmlUserId,
      });
      await this.GroupMemberHistoryRepositry.save({ ...updatedObj } as any);
      return true;
    } else throw new NotFoundException();
  }
}
