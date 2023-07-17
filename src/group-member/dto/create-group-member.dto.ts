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

export class CreateGroupMemberDataPayloadDto {
	@IsOptional()
	@IsNumber()
	businessRoleId?: number

	@IsOptional()
	@IsNumber()
	projectId?: number
}

export class CreateGroupMemberDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateGroupMemberDataPayloadDto)
  @IsArray()
  data: CreateGroupMemberDataPayloadDto[];
}
