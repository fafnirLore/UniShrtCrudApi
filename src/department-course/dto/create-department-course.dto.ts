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

export class CreateDepartmentCourseDataPayloadDto {
	@IsOptional()
	@IsNumber()
	departmentId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class CreateDepartmentCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentCourseDataPayloadDto)
  @IsArray()
  data: CreateDepartmentCourseDataPayloadDto[];
}
