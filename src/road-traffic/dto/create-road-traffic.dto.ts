import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoadTrafficDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;
}
