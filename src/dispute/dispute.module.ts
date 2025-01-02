import { Module } from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { DisputeController } from './dispute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispute } from './entity/dispute.entity';
import { UserModule } from 'src/user/user.module';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dispute]), UserModule, TicketModule],
  providers: [DisputeService],
  exports: [DisputeService],
  controllers: [DisputeController],
})
export class DisputeModule {}
