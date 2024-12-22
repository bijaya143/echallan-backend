import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;
}
