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
import { metaDataDto } from 'src/utils/commonDtos.dto';
import { Column } from 'typeorm';
//import { PartialType } from '@nestjs/swagger';

export class UpdateBusinessRoleDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	businessRoleId: number

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

export class UpdateBusinessRoleDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateBusinessRoleDataPayloadDto)
  @IsArray()
  data: UpdateBusinessRoleDataPayloadDto[];
}
