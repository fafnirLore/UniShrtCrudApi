import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { addStandardParameters } from 'src/utils/commonFunction';
import { FindAllBusinessRoleDto } from './dto/find-business-role.dto';
import { FindOneBusinessRoleDto } from './dto/findOne-business-role.dto';
import { BusinessRoleService } from './business-role.service';
import { CreateBusinessRoleDto } from './dto/create-business-role.dto';
import { UpdateBusinessRoleDto } from './dto/update-business-role.dto';

import { isEmpty } from 'lodash';
import { RestResponse } from 'src/utils/restResponse';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  DML_STATUS_UPDATE,
  DML_STATUS_INSERT,
} from 'src/utils/constants';
import { FindBusinessRoleHistoryDto } from './dto/find-business-role-history.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard, { Role } from 'src/auth/role.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import RoleGuard, { Role } from 'src/auth/role.guard';

@Controller('BusinessRole')
export class BusinessRoleController {
  constructor(private readonly BusinessRoleService: BusinessRoleService) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.addBusinessRole))
  @Post('addBusinessRole')
  async create(@Body() createServiceDto: CreateBusinessRoleDto) {
    try {
      const res = await Promise.all(
        createServiceDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(
            createServiceDto,
            createPayload,
          );
          return this.BusinessRoleService.create({
            ...standardParams,
            dmlStatus: DML_STATUS_INSERT,
            dmlTimestamps: dayjs().format(),
          });
        }),
      );

      if (!isEmpty(res)) {
        return RestResponse.success(res, SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.findAllBusinessRole))
  @Post('findAllBusinessRole')
  async findAll(@Body() findAllDto: FindAllBusinessRoleDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.BusinessRoleService.findAll(
            standardParams,
            findAllDto?.pagination,
          );
        }),
      );
      if (!isEmpty(res) && !isEmpty(res[0])) {
        return RestResponse.success(res, SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.findAllBusinessRole))
  @Post('findAllBusinessRoleHistory')
  async findAllHistory(@Body() findAllDto: FindBusinessRoleHistoryDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.BusinessRoleService.findAllHistory(
            standardParams,
            findAllDto?.pagination,
          );
        }),
      );
      if (!isEmpty(res) && !isEmpty(res[0])) {
        return RestResponse.success(res, SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.findByIdBusinessRole))
  @Post('findById')
  async findOne(@Body() findOneDto: FindAllBusinessRoleDto) {
    try {
      const res = await Promise.all(
        findOneDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findOneDto, findPayload);
          return this.BusinessRoleService.findOne(standardParams);
        }),
      );
      if (!isEmpty(res)) {
        return RestResponse.success(res, SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.updateBusinessRole))
  @Post('updateBusinessRole')
  async update(@Body() updateServiceDto: UpdateBusinessRoleDto) {
    try {
      const res = await Promise.all(
        updateServiceDto?.data?.map((updatePayload) => {
          const standardParams = addStandardParameters(
            updateServiceDto,
            updatePayload,
          );
          return this.BusinessRoleService.update({
            ...standardParams,
            dmlStatus: DML_STATUS_UPDATE,
            dmlTimestamps: dayjs().format(),
          });
        }),
      );
      if (!isEmpty(res)) {
        return RestResponse.success(res, SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard(Role.deleteBusinessRole))
  @Post('deleteBusinessRole')
  async remove(@Body() findOneServiceDto: FindOneBusinessRoleDto) {
    try {
      const res = await Promise.all(
        findOneServiceDto.data.map((findPayload) => {
          const standardParams = addStandardParameters(
            findOneServiceDto,
            findPayload,
          );
          return this.BusinessRoleService.remove(standardParams);
        }),
      );
      if (!isEmpty(res)) {
        return RestResponse.success(res, SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }
}
