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

export class FindAllDepartmentStudentHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentStudentId: number
}

export class FindDepartmentStudentHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllDepartmentStudentHistoryDataPayloadDto)
  @IsArray()
  data: FindAllDepartmentStudentHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
