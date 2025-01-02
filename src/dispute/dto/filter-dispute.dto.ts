import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from 'src/common';
import { DisputeStatus } from 'src/common/enums/dispute-status.enum';

export class FilterDisputeDto extends PaginationInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  licenseNumber?: string;

  @IsOptional()
  @IsEnum(DisputeStatus)
  @IsNotEmpty()
  status?: DisputeStatus;
}
