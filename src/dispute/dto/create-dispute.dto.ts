import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DisputeStatus } from 'src/common/enums/dispute-status.enum';

export class CreateDisputeDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  ticketId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsEnum(DisputeStatus)
  @IsNotEmpty()
  status?: DisputeStatus;
}
