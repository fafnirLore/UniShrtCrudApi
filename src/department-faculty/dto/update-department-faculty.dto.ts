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

export class UpdateDepartmentFacultyDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentFacultyId: number

	@IsOptional()
	@IsNumber()
	facultyId?: number

	@IsOptional()
	@IsNumber()
	departmentId?: number
}

export class UpdateDepartmentFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDepartmentFacultyDataPayloadDto)
  @IsArray()
  data: UpdateDepartmentFacultyDataPayloadDto[];
}
