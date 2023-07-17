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

export class FindDepartmentFacultyDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsNumber()
	facultyId?: number

	@IsOptional()
	@IsNumber()
	departmentId?: number
}

export class FindAllDepartmentFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindDepartmentFacultyDataPayloadDto)
  @IsArray()
  data: FindDepartmentFacultyDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
