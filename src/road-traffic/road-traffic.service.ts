import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoadTraffic } from './entity/road-traffic.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class RoadTrafficService {
  private logger: Logger = new Logger(RoadTrafficService.name);
  constructor(
    @InjectRepository(RoadTraffic)
    private readonly roadTrafficRepository: Repository<RoadTraffic>,
  ) {}

  async create(input: Partial<RoadTraffic>) {
    try {
      const roadTraffic = this.roadTrafficRepository.create(input);
      return await this.roadTrafficRepository.save(roadTraffic);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async update(id: string, input: Partial<RoadTraffic>) {
    try {
      return await this.roadTrafficRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async get(
    whereParams?: FindOptionsWhere<RoadTraffic>,
    orderParams?: FindOptionsOrder<RoadTraffic>,
    paginationInput?: PaginationInput,
  ) {
    return await this.roadTrafficRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
    });
  }

  async getOne(whereParams?: FindOptionsWhere<RoadTraffic>) {
    return await this.roadTrafficRepository.findOne({
      where: whereParams || {},
    });
  }

  async delete(id: string) {
    const result = await this.roadTrafficRepository.delete(id);
    if (result.affected == 1) {
      return 'Road Traffic has been deleted.';
    }
    throw new BadRequestException('Road Traffic was not deleted.');
  }
}
