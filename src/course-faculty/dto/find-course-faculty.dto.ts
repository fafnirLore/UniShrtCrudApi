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

export class FindCourseFacultyDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsNumber()
	facultyId?: number

	@IsOptional()
	@IsNumber()
	courseId?: number
}

export class FindAllCourseFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindCourseFacultyDataPayloadDto)
  @IsArray()
  data: FindCourseFacultyDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
