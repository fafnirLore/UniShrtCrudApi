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

export class FindDepartmentDataPayloadDto {
	@IsOptional()
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

export class FindAllDepartmentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindDepartmentDataPayloadDto)
  @IsArray()
  data: FindDepartmentDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
