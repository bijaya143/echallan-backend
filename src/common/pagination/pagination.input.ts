import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInput {
  @IsOptional()
  @IsNumber()
  page?: number = 1;
  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
