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

export class UpdateCourseStudentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseStudentId: number

	@IsOptional()
	@IsNumber()
	studentId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class UpdateCourseStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateCourseStudentDataPayloadDto)
  @IsArray()
  data: UpdateCourseStudentDataPayloadDto[];
}
