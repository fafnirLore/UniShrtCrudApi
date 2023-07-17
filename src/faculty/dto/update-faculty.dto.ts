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

export class UpdateFacultyDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	facultyId: number

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

export class UpdateFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateFacultyDataPayloadDto)
  @IsArray()
  data: UpdateFacultyDataPayloadDto[];
}
