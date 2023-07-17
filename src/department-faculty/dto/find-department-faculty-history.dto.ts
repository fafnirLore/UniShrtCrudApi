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

export class FindAllDepartmentFacultyHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentFacultyId: number
}

export class FindDepartmentFacultyHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllDepartmentFacultyHistoryDataPayloadDto)
  @IsArray()
  data: FindAllDepartmentFacultyHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
