import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entity/ticket.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class TicketService {
  private logger: Logger = new Logger(TicketService.name);

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(input: Partial<Ticket>) {
    try {
      const ticket = this.ticketRepository.create(input);
      return await this.ticketRepository.save(ticket);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(id: string, input: Partial<Ticket>) {
    try {
      return await this.ticketRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async get(
    whereParams?: FindOptionsWhere<Ticket>,
    orderParams?: FindOptionsOrder<Ticket>,
    paginationInput?: PaginationInput,
  ) {
    return await this.ticketRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
    });
  }

  async getOne(whereParams?: FindOptionsWhere<Ticket>) {
    return await this.ticketRepository.findOne({ where: whereParams || {} });
  }

  async delete(id: string) {
    const result = await this.ticketRepository.delete(id);
    if (result.affected == 1) {
      return 'Ticket has been deleted.';
    }
    throw new BadRequestException('Ticket was not deleted.');
  }
}
