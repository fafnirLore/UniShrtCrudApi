// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneDepartmentStudentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentStudentId: number
}

export class FindOneDepartmentStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDepartmentStudentDataPayloadDto)
  @IsArray()
  data: FindOneDepartmentStudentDataPayloadDto[];
}
