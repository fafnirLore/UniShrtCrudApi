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

export class CreateCourseFacultyDataPayloadDto {
	@IsOptional()
	@IsNumber()
	facultyId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class CreateCourseFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseFacultyDataPayloadDto)
  @IsArray()
  data: CreateCourseFacultyDataPayloadDto[];
}
