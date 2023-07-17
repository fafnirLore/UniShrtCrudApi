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

export class UpdateCourseFacultyDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseFacultyId: number

	@IsOptional()
	@IsNumber()
	facultyId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class UpdateCourseFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateCourseFacultyDataPayloadDto)
  @IsArray()
  data: UpdateCourseFacultyDataPayloadDto[];
}
