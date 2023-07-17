import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { addStandardParameters } from 'src/utils/commonFunction';
import { FindAllStudentDto } from './dto/find-student.dto';
import { FindOneStudentDto } from './dto/findOne-student.dto';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { isEmpty } from 'lodash';
import { RestResponse } from 'src/utils/restResponse';
import {
  SUCCESS_MESSAGE,
  NOT_FOUND_MESSAGE,
  DML_STATUS_UPDATE,
  DML_STATUS_INSERT,
} from 'src/utils/constants';
import { FindStudentHistoryDto } from './dto/find-student-history.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import RoleGuard, { Role } from 'src/auth/role.guard';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import RoleGuard, { Role } from 'src/auth/role.guard';

@Controller('Student')
export class StudentController {
  constructor(private readonly StudentService: StudentService) { }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.addStudent))
  @Post('addStudent')
  async create(@Body() createServiceDto: CreateStudentDto) {
    try {
      const res = await Promise.all(
        createServiceDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(
            createServiceDto,
            createPayload,
          );
          return this.StudentService.create({
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
  @UseGuards(RoleGuard(Role.findAllStudent))
  @Post('findAllStudent')
  async findAll(@Body() findAllDto: FindAllStudentDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.StudentService.findAll(
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
  @UseGuards(RoleGuard(Role.findAllStudent))
  @Post('findAllStudentHistory')
  async findAllHistory(@Body() findAllDto: FindStudentHistoryDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findAllDto, findPayload);
          return this.StudentService.findAllHistory(
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
  @UseGuards(RoleGuard(Role.findByIdStudent))
  @Post('findById')
  async findOne(@Body() findOneDto: FindAllStudentDto) {
    try {
      const res = await Promise.all(
        findOneDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(findOneDto, findPayload);
          return this.StudentService.findOne(standardParams);
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
  @UseGuards(RoleGuard(Role.updateStudent))
  @Post('updateStudent')
  async update(@Body() updateServiceDto: UpdateStudentDto) {
    try {
      const res = await Promise.all(
        updateServiceDto?.data?.map((updatePayload) => {
          const standardParams = addStandardParameters(
            updateServiceDto,
            updatePayload,
          );
          return this.StudentService.update({
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
  @UseGuards(RoleGuard(Role.deleteStudent))
  @Post('deleteStudent')
  async remove(@Body() findOneServiceDto: FindOneStudentDto) {
    try {
      const res = await Promise.all(
        findOneServiceDto.data.map((findPayload) => {
          const standardParams = addStandardParameters(
            findOneServiceDto,
            findPayload,
          );
          return this.StudentService.remove(standardParams);
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
