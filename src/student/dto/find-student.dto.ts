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

export class FindStudentDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsString()
	studentName?: string

	@IsOptional()
	@IsNumber()
	courseStudentId?: number

	@IsOptional()
	@IsNumber()
	departmentStudentId?: number
}

export class FindAllStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindStudentDataPayloadDto)
  @IsArray()
  data: FindStudentDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
