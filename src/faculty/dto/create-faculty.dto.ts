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

export class CreateFacultyDataPayloadDto {
	@IsOptional()
	@IsString()
	facultyName?: string

	@IsOptional()
	@IsNumber()
	courseFacultyId?: number

	@IsOptional()
	@IsNumber()
	departmentCourseId?: number
}

export class CreateFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFacultyDataPayloadDto)
  @IsArray()
  data: CreateFacultyDataPayloadDto[];
}
