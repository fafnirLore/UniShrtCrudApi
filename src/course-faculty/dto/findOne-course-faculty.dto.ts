// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneCourseFacultyDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseFacultyId: number
}

export class FindOneCourseFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneCourseFacultyDataPayloadDto)
  @IsArray()
  data: FindOneCourseFacultyDataPayloadDto[];
}
