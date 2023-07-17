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

export class FindCourseDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsNumber()
	courseFacultyId?: number

	@IsOptional()
	@IsNumber()
	courseStudentId?: number

	@IsOptional()
	@IsNumber()
	departmentCourseId?: number
}

export class FindAllCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindCourseDataPayloadDto)
  @IsArray()
  data: FindCourseDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
