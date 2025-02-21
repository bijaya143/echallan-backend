import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonAttribute {
  @CreateDateColumn()
  @Column('timestamptz', {
    name: 'created_at',
    default: () => 'current_timestamp', // Default current timestamp
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Column('timestamptz', {
    name: 'updated_at',
    default: () => 'current_timestamp', // Default current timestamp
  })
  updatedAt: Date;
}
