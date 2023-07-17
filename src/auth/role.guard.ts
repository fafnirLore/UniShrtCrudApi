import * as jwt from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
  Type,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { JWT_KEY } from 'src/utils/constants';

dotenv.config();

export enum Role {
addCourseFaculty = 'addCourseFaculty',
                                findAllCourseFaculty = 'findAllCourseFaculty',
                                findByIdCourseFaculty = 'findByIdCourseFaculty',
                                updateCourseFaculty = 'updateCourseFaculty',
                                deleteCourseFaculty = 'deleteCourseFaculty',
addCourseStudent = 'addCourseStudent',
                                findAllCourseStudent = 'findAllCourseStudent',
                                findByIdCourseStudent = 'findByIdCourseStudent',
                                updateCourseStudent = 'updateCourseStudent',
                                deleteCourseStudent = 'deleteCourseStudent',
addCourse = 'addCourse',
                                findAllCourse = 'findAllCourse',
                                findByIdCourse = 'findByIdCourse',
                                updateCourse = 'updateCourse',
                                deleteCourse = 'deleteCourse',
addDepartmentCourse = 'addDepartmentCourse',
                                findAllDepartmentCourse = 'findAllDepartmentCourse',
                                findByIdDepartmentCourse = 'findByIdDepartmentCourse',
                                updateDepartmentCourse = 'updateDepartmentCourse',
                                deleteDepartmentCourse = 'deleteDepartmentCourse',
addDepartmentFaculty = 'addDepartmentFaculty',
                                findAllDepartmentFaculty = 'findAllDepartmentFaculty',
                                findByIdDepartmentFaculty = 'findByIdDepartmentFaculty',
                                updateDepartmentFaculty = 'updateDepartmentFaculty',
                                deleteDepartmentFaculty = 'deleteDepartmentFaculty',
addDepartmentStudent = 'addDepartmentStudent',
                                findAllDepartmentStudent = 'findAllDepartmentStudent',
                                findByIdDepartmentStudent = 'findByIdDepartmentStudent',
                                updateDepartmentStudent = 'updateDepartmentStudent',
                                deleteDepartmentStudent = 'deleteDepartmentStudent',
addDepartment = 'addDepartment',
                                findAllDepartment = 'findAllDepartment',
                                findByIdDepartment = 'findByIdDepartment',
                                updateDepartment = 'updateDepartment',
                                deleteDepartment = 'deleteDepartment',
addFaculty = 'addFaculty',
                                findAllFaculty = 'findAllFaculty',
                                findByIdFaculty = 'findByIdFaculty',
                                updateFaculty = 'updateFaculty',
                                deleteFaculty = 'deleteFaculty',
addStudent = 'addStudent',
                                findAllStudent = 'findAllStudent',
                                findByIdStudent = 'findByIdStudent',
                                updateStudent = 'updateStudent',
                                deleteStudent = 'deleteStudent',}

const RoleGuard = (...roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();

      let token =
        request.headers.authorization || request.headers['x-access-token'];
      token = token.replace(/^Bearer\s+/, '');
      console.log('token:   ', token);

      let decoded: any;
      try {
        decoded = jwt.verify(token, JWT_KEY);
      } catch (err) {
        throw new ForbiddenException();
      }

      const res = await roles.some((role) =>
        decoded?.userRoleName.includes(role),
      );
      return res;
    }
  }

  return mixin(RoleGuardMixin);
};
export default RoleGuard;
