// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneDepartmentCourseDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentCourseId: number
}

export class FindOneDepartmentCourseDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDepartmentCourseDataPayloadDto)
  @IsArray()
  data: FindOneDepartmentCourseDataPayloadDto[];
}
