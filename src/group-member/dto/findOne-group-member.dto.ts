// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneGroupMemberDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	groupMemberId: number
}

export class FindOneGroupMemberDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneGroupMemberDataPayloadDto)
  @IsArray()
  data: FindOneGroupMemberDataPayloadDto[];
}
