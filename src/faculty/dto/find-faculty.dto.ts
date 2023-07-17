//import { PartialType } from '@nestjs/swagger';
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
import { metaDataDto, paginationDto } from 'src/utils/commonDtos.dto';

export class FindFacultyDataPayloadDto {
	@IsOptional()
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

export class FindAllFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindFacultyDataPayloadDto)
  @IsArray()
  data: FindFacultyDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
