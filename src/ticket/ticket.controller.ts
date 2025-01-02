import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PaginationInput } from 'src/common';
import { TicketStatus } from 'src/common/enums/ticket-status.enum';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTickets(@Query() paginationInput?: PaginationInput) {
    const [tickets, count] = await this.ticketService.get(
      null,
      null,
      paginationInput,
    );
    return {
      data: tickets,
      meta: {
        limit: paginationInput?.limit || 10,
        page: paginationInput?.page || 1,
        total: count,
      },
    };
  }

  @Get(':id')
  async getTicket(@Param('id') id: string) {
    const ticket = await this.ticketService.getOne({ id: id });
    if (!ticket) throw new BadRequestException('Ticket was not found.');
    return ticket;
  }

  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketService.create({
      ...createTicketDto,
      status: TicketStatus.PENDING,
    });
  }

  @Patch(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    const result = await this.ticketService.update(id, updateTicketDto);
    if (result.affected === 1) return 'Ticket has been updated.';
    throw new BadRequestException('Ticket was not updated.');
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string) {
    return await this.ticketService.delete(id);
  }
}
