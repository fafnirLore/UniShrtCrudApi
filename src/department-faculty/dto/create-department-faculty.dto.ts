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

export class CreateDepartmentFacultyDataPayloadDto {
	@IsOptional()
	@IsNumber()
	facultyId?: number

	@IsOptional()
	@IsNumber()
	departmentId?: number
}

export class CreateDepartmentFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDepartmentFacultyDataPayloadDto)
  @IsArray()
  data: CreateDepartmentFacultyDataPayloadDto[];
}
