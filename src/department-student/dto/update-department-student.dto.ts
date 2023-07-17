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

export class UpdateDepartmentStudentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentStudentId: number

	@IsOptional()
	@IsNumber()
	studentId?: number

	@IsOptional()
	@IsNumber()
	departmentId?: number
}

export class UpdateDepartmentStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDepartmentStudentDataPayloadDto)
  @IsArray()
  data: UpdateDepartmentStudentDataPayloadDto[];
}
