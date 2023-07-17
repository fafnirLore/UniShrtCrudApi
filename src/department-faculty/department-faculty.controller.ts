import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { addStandardParameters } from 'src/utils/commonFunction';
import { FindAllDepartmentFacultyDto } from './dto/find-department-faculty.dto';
import { FindOneDepartmentFacultyDto } from './dto/findOne-department-faculty.dto';
import { DepartmentFacultyService } from './department-faculty.service';
import { CreateDepartmentFacultyDto } from './dto/create-department-faculty.dto';
import { UpdateDepartmentFacultyDto } from './dto/update-department-faculty.dto';

import { isEmpty } from 'lodash';
import { RestResponse } from 'src/utils/restResponse';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  DML_STATUS_UPDATE,
  DML_STATUS_INSERT,
} from 'src/utils/constants';
import { FindDepartmentFacultyHistoryDto } from './dto/find-department-faculty-history.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard, { Role } from 'src/auth/role.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import RoleGuard, { Role } from 'src/auth/role.guard';

@Controller('DepartmentFaculty')
export class DepartmentFacultyController {
  constructor(private readonly DepartmentFacultyService: DepartmentFacultyService) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.addDepartmentFaculty))
  @Post('addDepartmentFaculty')
  async create(@Body() createServiceDto: CreateDepartmentFacultyDto) {
    try {
      const res = await Promise.all(
        createServiceDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(
            createServiceDto,
            createPayload,
          );
          return this.DepartmentFacultyService.create({
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
  @UseGuards(RoleGuard(Role.findAllDepartmentFaculty))
  @Post('findAllDepartmentFaculty')
  async findAll(@Body() findAllDto: FindAllDepartmentFacultyDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.DepartmentFacultyService.findAll(
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
  @UseGuards(RoleGuard(Role.findAllDepartmentFaculty))
  @Post('findAllDepartmentFacultyHistory')
  async findAllHistory(@Body() findAllDto: FindDepartmentFacultyHistoryDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.DepartmentFacultyService.findAllHistory(
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
  @UseGuards(RoleGuard(Role.findByIdDepartmentFaculty))
  @Post('findById')
  async findOne(@Body() findOneDto: FindAllDepartmentFacultyDto) {
    try {
      const res = await Promise.all(
        findOneDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findOneDto, findPayload);
          return this.DepartmentFacultyService.findOne(standardParams);
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
  @UseGuards(RoleGuard(Role.updateDepartmentFaculty))
  @Post('updateDepartmentFaculty')
  async update(@Body() updateServiceDto: UpdateDepartmentFacultyDto) {
    try {
      const res = await Promise.all(
        updateServiceDto?.data?.map((updatePayload) => {
          const standardParams = addStandardParameters(
            updateServiceDto,
            updatePayload,
          );
          return this.DepartmentFacultyService.update({
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
  @UseGuards(RoleGuard(Role.deleteDepartmentFaculty))
  @Post('deleteDepartmentFaculty')
  async remove(@Body() findOneServiceDto: FindOneDepartmentFacultyDto) {
    try {
      const res = await Promise.all(
        findOneServiceDto.data.map((findPayload) => {
          const standardParams = addStandardParameters(
            findOneServiceDto,
            findPayload,
          );
          return this.DepartmentFacultyService.remove(standardParams);
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
