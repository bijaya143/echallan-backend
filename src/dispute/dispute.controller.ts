import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DisputeService } from './dispute.service';
import { DisputeStatus } from 'src/common/enums/dispute-status.enum';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { UserService } from 'src/user/user.service';
import { TicketService } from 'src/ticket/ticket.service';
import { TicketStatus } from 'src/common/enums/ticket-status.enum';
import { FilterDisputeDto } from './dto/filter-dispute.dto';
import { FindOptionsWhere } from 'typeorm';
import { Dispute } from './entity/dispute.entity';

@Controller('dispute')
export class DisputeController {
  constructor(
    private readonly disputeService: DisputeService,
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
  ) {}

  @Get()
  async getDisputes(@Query() filterInput?: FilterDisputeDto) {
    const { limit, page, licenseNumber, status } = filterInput;
    const getParams: FindOptionsWhere<Dispute> = {};
    if (licenseNumber) {
      getParams.ticket = { licenseNumber }; // Filtering with license number
    }
    if (status) {
      getParams.status = status;
    }
    const [disputes, count] = await this.disputeService.get(getParams, null, {
      limit,
      page,
    });
    return {
      data: disputes,
      meta: {
        limit: limit || 10,
        page: page || 1,
        total: count,
      },
    };
  }

  @Get(':id')
  async getDispute(@Param('id') id: string) {
    const dispute = await this.disputeService.getOne({ id: id });
    if (!dispute) throw new BadRequestException('Dispute was not found.');
    return dispute;
  }

  @Post()
  async createDispute(@Body() createDisputeDto: CreateDisputeDto) {
    const { ticketId, userId } = createDisputeDto;

    //? Ticket Validation
    const ticket = await this.ticketService.getOne({ id: ticketId });
    if (!ticket) throw new NotFoundException('Ticket was not found.');

    //? User Validation
    const user = await this.userService.getOne({ id: userId });
    if (!user) throw new NotFoundException('User was not found.');

    const dispute = await this.disputeService.create({
      ...createDisputeDto,
      user: user,
      ticket: ticket,
      status: DisputeStatus.PENDING,
    });

    //? Update Ticket Status
    await this.ticketService.update(ticketId, {
      status:
        ticket.status === TicketStatus.PAID
          ? TicketStatus.PAID_AND_DISPUTED
          : TicketStatus.DISPUTED,
    });
    return dispute;
  }

  @Patch(':id')
  async updateDispute(
    @Param('id') id: string,
    @Body() updateDisputeDto: UpdateDisputeDto,
  ) {
    const result = await this.disputeService.update(id, updateDisputeDto);
    if (result.affected === 1) return 'Dispute has been updated.';
    throw new BadRequestException('Dispute was not updated.');
  }

  @Delete(':id')
  async deleteDispute(@Param('id') id: string) {
    return await this.disputeService.delete(id);
  }
}
