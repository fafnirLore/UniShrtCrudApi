import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class CreateCourseStudentDataPayloadDto {
	@IsOptional()
	@IsNumber()
	studentId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class CreateCourseStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseStudentDataPayloadDto)
  @IsArray()
  data: CreateCourseStudentDataPayloadDto[];
}
