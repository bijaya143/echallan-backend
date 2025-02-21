import { IsNumber, IsOptional } from 'class-validator';

export class PaginationInput {
  @IsOptional()
  @IsNumber()
  page?: number = 1; // Default page is 1
  @IsOptional()
  @IsNumber()
  limit?: number = 10; // Default limit is 10
}
