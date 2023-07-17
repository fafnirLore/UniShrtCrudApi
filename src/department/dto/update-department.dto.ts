import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';
import { Column } from 'typeorm';
//import { PartialType } from '@nestjs/swagger';

export class UpdateDepartmentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentId: number

	@IsOptional()
	@IsString()
	departmentName?: string

	@IsOptional()
	@IsNumber()
	departmentCourseId?: number

	@IsOptional()
	@IsNumber()
	departmentFacultyId?: number

	@IsOptional()
	@IsNumber()
	departmentStudentId?: number
}

export class UpdateDepartmentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDepartmentDataPayloadDto)
  @IsArray()
  data: UpdateDepartmentDataPayloadDto[];
}
