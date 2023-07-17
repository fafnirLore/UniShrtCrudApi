import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class metaDataDto {
  @IsNumber()
  currentUserId?: number;

  @IsNumber()
  currentProjectId?: number;

  @IsNumber()
  activatedRoleId?: number;

  @IsString()
  activatedRoleTitle?: string;

  @IsNumber()
  applicationId?: number;

  @IsNumber()
  versionId?: number;

  @IsString()
  projectTitle?: string;

  @IsString()
  username?: string;

  @IsString()
  projectType?: string;

  @IsNumber()
  clientId?: number;
}

export class RangeDto {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;
}

export class paginationDto {
  @IsOptional()
  @IsNumber()
  pageNo?: number;

  @IsOptional()
  @IsNumber()
  itemsPerPage?: number;
}
