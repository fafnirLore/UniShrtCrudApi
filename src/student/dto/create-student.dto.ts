import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class CreateStudentDataPayloadDto {
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

export class CreateStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateStudentDataPayloadDto)
  @IsArray()
  data: CreateStudentDataPayloadDto[];
}
