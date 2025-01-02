import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationInput } from 'src/common';
import { TicketStatus } from 'src/common/enums/ticket-status.enum';

export class FilterTicketDto extends PaginationInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  licenseNumber?: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status?: TicketStatus;
}
