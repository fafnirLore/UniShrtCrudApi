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

export class CreateDepartmentStudentDataPayloadDto {
	@IsOptional()
	@IsNumber()
	studentId?: number

	@IsOptional()
	@IsNumber()
	departmentId?: number
}

export class CreateDepartmentStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentStudentDataPayloadDto)
  @IsArray()
  data: CreateDepartmentStudentDataPayloadDto[];
}
