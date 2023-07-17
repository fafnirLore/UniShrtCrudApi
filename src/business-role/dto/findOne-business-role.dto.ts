// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneBusinessRoleDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	businessRoleId: number
}

export class FindOneBusinessRoleDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneBusinessRoleDataPayloadDto)
  @IsArray()
  data: FindOneBusinessRoleDataPayloadDto[];
}
