import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationInput } from 'src/common';
import { UserType } from 'src/common/enums/user-type.enum';

export class FilterUserDto extends PaginationInput {
  @IsOptional()
  @IsEnum(UserType)
  @IsNotEmpty()
  userType?: UserType;
}
