import { CommonAttribute } from 'src/common';
import { DisputeStatus } from 'src/common/enums/dispute-status.enum';
import { Ticket } from 'src/ticket/entity/ticket.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'disputes' })
export class Dispute extends CommonAttribute {
  @Generated('uuid')
  @Column('uuid', { name: 'id', primary: true })
  id: string;

  @OneToOne((type) => Ticket, (ticket) => ticket.id)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne((type) => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { name: 'reason' })
  reason: string;

  @Column('varchar', { name: 'status', default: DisputeStatus.PENDING })
  status: string;
}
