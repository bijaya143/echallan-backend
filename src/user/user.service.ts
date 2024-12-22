import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(input: Partial<User>) {
    try {
      const user = this.userRepository.create(input);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('User was not created.');
    }
  }

  async update(id: string, input?: Partial<User>) {
    try {
      return await this.userRepository.update(id, input);
    } catch (error) {
      throw new BadRequestException('User was not updated.');
    }
  }

  async get(
    whereParams?: FindOptionsWhere<User>,
    orderParams?: FindOptionsOrder<User>,
    paginationInput?: PaginationInput,
  ) {
    return await this.userRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
    });
  }

  async getOne(whereParams?: FindOptionsWhere<User>) {
    return await this.userRepository.findOne({
      where: whereParams || {},
    });
  }

  async delete(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected == 1) {
      return 'User has been deleted.';
    }
    throw new BadRequestException('User was not deleted.');
  }
}
