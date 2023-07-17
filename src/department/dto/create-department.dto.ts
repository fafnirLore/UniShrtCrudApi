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

export class CreateDepartmentDataPayloadDto {
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

export class CreateDepartmentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentDataPayloadDto)
  @IsArray()
  data: CreateDepartmentDataPayloadDto[];
}
