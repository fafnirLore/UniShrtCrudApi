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

export class FindAllDepartmentHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentId: number
}

export class FindDepartmentHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllDepartmentHistoryDataPayloadDto)
  @IsArray()
  data: FindAllDepartmentHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
