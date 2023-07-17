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

export class FindAllBusinessRoleHistoryDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	businessRoleId: number
}

export class FindBusinessRoleHistoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllBusinessRoleHistoryDataPayloadDto)
  @IsArray()
  data: FindAllBusinessRoleHistoryDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
