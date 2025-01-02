import { CommonAttribute } from 'src/common';
import { Column, Entity, Generated } from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @Column('varchar', { name: 'full_name' })
  fullName: string;

  @Column('varchar', { name: 'license_number' })
  licenseNumber: string;

  @Column('varchar', { name: 'vehicle_number' })
  vehicleNumber: string;

  @Column('varchar', { name: 'district' })
  district: string;

  @Column('varchar', { name: 'reason' })
  reason: string;

  @Column('varchar', { name: 'amount' })
  amount: string;

  @Column('varchar', { name: 'issued_by' })
  issuedBy: string;

  @Column('varchar', { name: 'status' })
  status: string;
}
