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

export class FindBusinessRoleDataPayloadDto {
	@IsOptional()
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsString()
	type?: string

	@IsOptional()
	@IsNumber()
	projectId?: number

	@IsOptional()
	@IsString()
	description?: string

	@IsOptional()
	@IsNumber()
	clientId?: number

	@IsOptional()
	@IsNumber()
	rootId?: number
}

export class FindAllBusinessRoleDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindBusinessRoleDataPayloadDto)
  @IsArray()
  data: FindBusinessRoleDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
