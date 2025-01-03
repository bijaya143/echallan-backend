import { CommonAttribute } from 'src/common';
import { Column, Entity, Generated } from 'typeorm';

@Entity({ name: 'road_traffic' })
export class RoadTraffic extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('varchar', { name: 'from' })
  from: string;

  @Column('varchar', { name: 'to' })
  to: string;
}
