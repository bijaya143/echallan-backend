import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TicketStatus } from 'src/common/enums/ticket-status.enum';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  vehicleNumber: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  issuedBy: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  @IsNotEmpty()
  status?: TicketStatus;
}
