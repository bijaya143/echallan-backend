import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationInput } from 'src/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Query() paginationInput?: PaginationInput) {
    const [users, count] = await this.userService.get(
      null,
      null,
      paginationInput,
    );
    return {
      data: users,
      meta: {
        limit: paginationInput?.limit || 10,
        page: paginationInput?.page || 1,
        total: count,
      },
    };
  }
}
