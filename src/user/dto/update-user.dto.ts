import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateLicenseDto {
  @IsOptional()
  @IsString({ each: true })
  @IsNotEmpty()
  categories?: string[];
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bloodGroup?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  dateOfBirth?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  issueDate?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  expiryDate?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  familyHistory?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  citizenshipNumber?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  bio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profileImage?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  zipCode?: string;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  license?: CreateLicenseDto;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trafficPoliceId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trafficJoinedDate?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trafficServingDistrict?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  trafficPosition?: string;
}
