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

export class FindAllCourseStudentHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseStudentId: number
}

export class FindCourseStudentHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllCourseStudentHistoryDataPayloadDto)
  @IsArray()
  data: FindAllCourseStudentHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
