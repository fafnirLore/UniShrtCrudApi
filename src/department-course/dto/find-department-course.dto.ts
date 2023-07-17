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

export class FindDepartmentCourseDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsNumber()
	departmentId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class FindAllDepartmentCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindDepartmentCourseDataPayloadDto)
  @IsArray()
  data: FindDepartmentCourseDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
