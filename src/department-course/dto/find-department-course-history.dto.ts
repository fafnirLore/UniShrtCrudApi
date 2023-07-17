// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { metaDataDto, paginationDto } from 'src/utils/commonDtos.dto';

export class FindAllDepartmentCourseHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentCourseId: number
}

export class FindDepartmentCourseHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllDepartmentCourseHistoryDataPayloadDto)
  @IsArray()
  data: FindAllDepartmentCourseHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
