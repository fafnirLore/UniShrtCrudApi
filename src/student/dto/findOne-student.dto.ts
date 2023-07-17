// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneStudentDataPayloadDto {
	@IsNotEmpty()
	@IsNumber()
	studentId: number
}

export class FindOneStudentDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneStudentDataPayloadDto)
  @IsArray()
  data: FindOneStudentDataPayloadDto[];
}
