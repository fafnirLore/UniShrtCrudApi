// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneCourseDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseId: number
}

export class FindOneCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneCourseDataPayloadDto)
  @IsArray()
  data: FindOneCourseDataPayloadDto[];
}
