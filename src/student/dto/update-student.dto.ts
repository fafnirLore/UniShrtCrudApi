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

export class UpdateStudentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	studentId: number

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

export class UpdateStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateStudentDataPayloadDto)
  @IsArray()
  data: UpdateStudentDataPayloadDto[];
}
