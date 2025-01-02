import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispute } from './entity/dispute.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class DisputeService {
  private logger: Logger = new Logger(DisputeService.name);

  constructor(
    @InjectRepository(Dispute)
    private readonly disputeRepository: Repository<Dispute>,
  ) {}

  async create(input: Partial<Dispute>) {
    try {
      const dispute = this.disputeRepository.create(input);
      return await this.disputeRepository.save(dispute);
    } catch (error) {
      this.logger.error(error);
      if (error.code === '23505') {
        throw new BadRequestException('Ticket is already disputed.');
      }
      throw new BadRequestException(error);
    }
  }

  async update(id: string, input: Partial<Dispute>) {
    try {
      return await this.disputeRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async get(
    whereParams?: FindOptionsWhere<Dispute>,
    orderParams?: FindOptionsOrder<Dispute>,
    paginationInput?: PaginationInput,
  ) {
    return await this.disputeRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
      relations: ['user', 'ticket'],
    });
  }

  async getOne(whereParams?: FindOptionsWhere<Dispute>) {
    return await this.disputeRepository.findOne({
      where: whereParams || {},
      relations: ['user', 'ticket'],
    });
  }

  async delete(id: string) {
    const result = await this.disputeRepository.delete(id);
    if (result.affected == 1) {
      return 'Dispute has been deleted.';
    }
    throw new BadRequestException('Dispute was not deleted.');
  }
}
