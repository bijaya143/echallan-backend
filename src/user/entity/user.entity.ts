import { CommonAttribute } from 'src/common';
import { UserType } from 'src/common/enums/user-type.enum';
import { Column, Entity, Generated } from 'typeorm';

@Entity({ name: 'users' })
export class User extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @Column('varchar', { name: 'full_name', nullable: true })
  fullName?: string;

  @Column('varchar', { name: 'email', nullable: true })
  email?: string;

  @Column('varchar', { name: 'phone', nullable: true })
  phone?: string;

  @Column('varchar', { name: 'bio', nullable: true })
  bio?: string;

  @Column('varchar', { name: 'password', nullable: false })
  password: string;

  @Column('varchar', { name: 'date_of_birth', nullable: true })
  dateOfBirth?: string;

  @Column('varchar', { name: 'gender', nullable: true })
  gender?: string;

  @Column('varchar', {
    name: 'user_type',
    nullable: false,
    default: UserType.USER,
  })
  userType: string;

  @Column('boolean', { name: 'isConfirmed', default: false, nullable: false })
  isConfirmed: boolean;

  @Column('varchar', {
    name: 'verification_otp',
    nullable: true,
  })
  verificationOtp?: string;

  @Column('timestamptz', {
    name: 'verification_otp_expires_at',
    nullable: true,
  })
  verificationOtpExpiresAt?: Date;

  @Column('varchar', {
    name: 'forgot_password_otp',
    nullable: true,
  })
  forgotPasswordOtp?: string;

  @Column('timestamptz', {
    name: 'forgot_password_otp_expires_at',
    nullable: true,
  })
  forgotPasswordOtpExpiresAt?: Date;

  @Column('varchar', { name: 'profile_image', nullable: true })
  profileImage?: string;

  @Column('varchar', { name: 'address', nullable: true })
  address?: string;

  @Column('varchar', { name: 'city', nullable: true })
  city?: string;

  @Column('varchar', { name: 'state', nullable: true })
  state?: string;

  @Column('varchar', { name: 'zip_code', nullable: true })
  zipCode?: string;

  // License details -- will be in a separate file later
  @Column('jsonb', { name: 'license', nullable: true })
  license?: {
    categories?: string[];
    id?: string;
    bloodGroup?: string;
    dateOfBirth?: string;
    issueDate?: string;
    expiryDate?: string;
    familyHistory?: string;
    citizenshipNumber?: string;
    phoneNumber?: string;
  };

  // Traffic details -- will be in a separate file later
  @Column('varchar', { name: 'traffic_police_id', nullable: true })
  trafficPoliceId?: string;

  @Column('varchar', { name: 'traffic_joined_date', nullable: true })
  trafficJoinedDate?: string;

  @Column('varchar', { name: 'traffic_serving_district', nullable: true })
  trafficServingDistrict: string;

  @Column('varchar', { name: 'traffic_position', nullable: true })
  trafficPosition: string;
}
