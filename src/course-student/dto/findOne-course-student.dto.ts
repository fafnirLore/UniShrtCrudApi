// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneCourseStudentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	courseStudentId: number
}

export class FindOneCourseStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneCourseStudentDataPayloadDto)
  @IsArray()
  data: FindOneCourseStudentDataPayloadDto[];
}
