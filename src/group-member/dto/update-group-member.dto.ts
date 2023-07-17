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

export class UpdateGroupMemberDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	groupMemberId: number

	@IsOptional()
	@IsNumber()
	businessRoleId?: number

	@IsOptional()
	@IsNumber()
	projectId?: number
}

export class UpdateGroupMemberDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateGroupMemberDataPayloadDto)
  @IsArray()
  data: UpdateGroupMemberDataPayloadDto[];
}
