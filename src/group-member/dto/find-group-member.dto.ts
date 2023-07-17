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

export class FindGroupMemberDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsNumber()
	businessRoleId?: number

	@IsOptional()
	@IsNumber()
	projectId?: number
}

export class FindAllGroupMemberDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindGroupMemberDataPayloadDto)
  @IsArray()
  data: FindGroupMemberDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
