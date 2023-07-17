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

export class UpdateDepartmentCourseDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentCourseId: number

	@IsOptional()
	@IsNumber()
	departmentId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class UpdateDepartmentCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDepartmentCourseDataPayloadDto)
  @IsArray()
  data: UpdateDepartmentCourseDataPayloadDto[];
}
