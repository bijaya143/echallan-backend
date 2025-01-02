import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FilterUserDto } from './dto/filter-user.dto';
import { FindOptionsWhere } from 'typeorm';
import { User } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(@Query() filterInput?: FilterUserDto) {
    const { limit, page, userType } = filterInput;
    const getParams: FindOptionsWhere<User> = {};
    if (userType) {
      getParams.userType = userType;
    }
    const [users, count] = await this.userService.get(getParams, null, {
      limit,
      page,
    });
    return {
      data: users,
      meta: {
        limit: limit || 10,
        page: page || 1,
        total: count,
      },
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getOne({ id: id });
    if (!user) throw new BadRequestException('User was not found.');
    return user;
  }

  @Patch(':id') // Should have used Auth Decorator instead of passing ID as a parameter
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    if (result.affected === 1) return 'User has been updated.';
    throw new BadRequestException('User was not updated.');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
