// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneDepartmentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentId: number
}

export class FindOneDepartmentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDepartmentDataPayloadDto)
  @IsArray()
  data: FindOneDepartmentDataPayloadDto[];
}
