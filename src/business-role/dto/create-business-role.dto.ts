import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class CreateBusinessRoleDataPayloadDto {
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

export class CreateBusinessRoleDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateBusinessRoleDataPayloadDto)
  @IsArray()
  data: CreateBusinessRoleDataPayloadDto[];
}
