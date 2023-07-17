import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { addStandardParameters } from 'src/utils/commonFunction';
import { FindAllCourseStudentDto } from './dto/find-course-student.dto';
import { FindOneCourseStudentDto } from './dto/findOne-course-student.dto';
import { CourseStudentService } from './course-student.service';
import { CreateCourseStudentDto } from './dto/create-course-student.dto';
import { UpdateCourseStudentDto } from './dto/update-course-student.dto';

import { isEmpty } from 'lodash';
import { RestResponse } from 'src/utils/restResponse';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  DML_STATUS_UPDATE,
  DML_STATUS_INSERT,
} from 'src/utils/constants';
import { FindCourseStudentHistoryDto } from './dto/find-course-student-history.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard, { Role } from 'src/auth/role.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import RoleGuard, { Role } from 'src/auth/role.guard';

@Controller('CourseStudent')
export class CourseStudentController {
  constructor(private readonly CourseStudentService: CourseStudentService) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.addCourseStudent))
  @Post('addCourseStudent')
  async create(@Body() createServiceDto: CreateCourseStudentDto) {
    try {
      const res = await Promise.all(
        createServiceDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(
            createServiceDto,
            createPayload,
          );
          return this.CourseStudentService.create({
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
  @UseGuards(RoleGuard(Role.findAllCourseStudent))
  @Post('findAllCourseStudent')
  async findAll(@Body() findAllDto: FindAllCourseStudentDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.CourseStudentService.findAll(
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
  @UseGuards(RoleGuard(Role.findAllCourseStudent))
  @Post('findAllCourseStudentHistory')
  async findAllHistory(@Body() findAllDto: FindCourseStudentHistoryDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.CourseStudentService.findAllHistory(
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
  @UseGuards(RoleGuard(Role.findByIdCourseStudent))
  @Post('findById')
  async findOne(@Body() findOneDto: FindAllCourseStudentDto) {
    try {
      const res = await Promise.all(
        findOneDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findOneDto, findPayload);
          return this.CourseStudentService.findOne(standardParams);
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
  @UseGuards(RoleGuard(Role.updateCourseStudent))
  @Post('updateCourseStudent')
  async update(@Body() updateServiceDto: UpdateCourseStudentDto) {
    try {
      const res = await Promise.all(
        updateServiceDto?.data?.map((updatePayload) => {
          const standardParams = addStandardParameters(
            updateServiceDto,
            updatePayload,
          );
          return this.CourseStudentService.update({
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
  @UseGuards(RoleGuard(Role.deleteCourseStudent))
  @Post('deleteCourseStudent')
  async remove(@Body() findOneServiceDto: FindOneCourseStudentDto) {
    try {
      const res = await Promise.all(
        findOneServiceDto.data.map((findPayload) => {
          const standardParams = addStandardParameters(
            findOneServiceDto,
            findPayload,
          );
          return this.CourseStudentService.remove(standardParams);
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
