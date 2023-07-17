// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneFacultyDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	facultyId: number
}

export class FindOneFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneFacultyDataPayloadDto)
  @IsArray()
  data: FindOneFacultyDataPayloadDto[];
}
