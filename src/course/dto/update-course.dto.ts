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

export class UpdateCourseDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseId: number

	@IsOptional()
	@IsNumber()
	courseFacultyId?: number

	@IsOptional()
	@IsNumber()
	courseStudentId?: number

	@IsOptional()
	@IsNumber()
	departmentCourseId?: number
}

export class UpdateCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateCourseDataPayloadDto)
  @IsArray()
  data: UpdateCourseDataPayloadDto[];
}
