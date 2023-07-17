import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { addStandardParameters } from 'src/utils/commonFunction';
import { FindAllCourseFacultyDto } from './dto/find-course-faculty.dto';
import { FindOneCourseFacultyDto } from './dto/findOne-course-faculty.dto';
import { CourseFacultyService } from './course-faculty.service';
import { CreateCourseFacultyDto } from './dto/create-course-faculty.dto';
import { UpdateCourseFacultyDto } from './dto/update-course-faculty.dto';

import { isEmpty } from 'lodash';
import { RestResponse } from 'src/utils/restResponse';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  DML_STATUS_UPDATE,
  DML_STATUS_INSERT,
} from 'src/utils/constants';
import { FindCourseFacultyHistoryDto } from './dto/find-course-faculty-history.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard, { Role } from 'src/auth/role.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import RoleGuard, { Role } from 'src/auth/role.guard';

@Controller('CourseFaculty')
export class CourseFacultyController {
  constructor(private readonly CourseFacultyService: CourseFacultyService) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.addCourseFaculty))
  @Post('addCourseFaculty')
  async create(@Body() createServiceDto: CreateCourseFacultyDto) {
    try {
      const res = await Promise.all(
        createServiceDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(
            createServiceDto,
            createPayload,
          );
          return this.CourseFacultyService.create({
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
  @UseGuards(RoleGuard(Role.findAllCourseFaculty))
  @Post('findAllCourseFaculty')
  async findAll(@Body() findAllDto: FindAllCourseFacultyDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.CourseFacultyService.findAll(
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
  @UseGuards(RoleGuard(Role.findAllCourseFaculty))
  @Post('findAllCourseFacultyHistory')
  async findAllHistory(@Body() findAllDto: FindCourseFacultyHistoryDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.CourseFacultyService.findAllHistory(
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
  @UseGuards(RoleGuard(Role.findByIdCourseFaculty))
  @Post('findById')
  async findOne(@Body() findOneDto: FindAllCourseFacultyDto) {
    try {
      const res = await Promise.all(
        findOneDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findOneDto, findPayload);
          return this.CourseFacultyService.findOne(standardParams);
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
  @UseGuards(RoleGuard(Role.updateCourseFaculty))
  @Post('updateCourseFaculty')
  async update(@Body() updateServiceDto: UpdateCourseFacultyDto) {
    try {
      const res = await Promise.all(
        updateServiceDto?.data?.map((updatePayload) => {
          const standardParams = addStandardParameters(
            updateServiceDto,
            updatePayload,
          );
          return this.CourseFacultyService.update({
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
  @UseGuards(RoleGuard(Role.deleteCourseFaculty))
  @Post('deleteCourseFaculty')
  async remove(@Body() findOneServiceDto: FindOneCourseFacultyDto) {
    try {
      const res = await Promise.all(
        findOneServiceDto.data.map((findPayload) => {
          const standardParams = addStandardParameters(
            findOneServiceDto,
            findPayload,
          );
          return this.CourseFacultyService.remove(standardParams);
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
