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

export class FindDepartmentStudentDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsNumber()
	studentId?: number

	@IsOptional()
	@IsNumber()
	departmentId?: number
}

export class FindAllDepartmentStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindDepartmentStudentDataPayloadDto)
  @IsArray()
  data: FindDepartmentStudentDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
