// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneDepartmentFacultyDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	departmentFacultyId: number
}

export class FindOneDepartmentFacultyDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDepartmentFacultyDataPayloadDto)
  @IsArray()
  data: FindOneDepartmentFacultyDataPayloadDto[];
}
