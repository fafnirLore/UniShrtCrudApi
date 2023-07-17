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

export class FindAllCourseFacultyHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseFacultyId: number
}

export class FindCourseFacultyHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllCourseFacultyHistoryDataPayloadDto)
  @IsArray()
  data: FindAllCourseFacultyHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
