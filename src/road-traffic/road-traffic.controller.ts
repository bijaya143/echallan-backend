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
import { RoadTrafficService } from './road-traffic.service';
import { PaginationInput } from 'src/common';
import { CreateRoadTrafficDto } from './dto/create-road-traffic.dto';
import { UpdateRoadTrafficDto } from './dto/update-road-traffic.dto';

@Controller('road-traffic')
export class RoadTrafficController {
  constructor(private readonly roadTrafficService: RoadTrafficService) {}

  @Get()
  async getRoadTraffics(@Query() paginationInput?: PaginationInput) {
    const [roadTraffic, count] = await this.roadTrafficService.get(
      null,
      null,
      paginationInput,
    );
    return {
      data: roadTraffic,
      meta: {
        limit: paginationInput?.limit || 10,
        page: paginationInput?.page || 1,
        total: count,
      },
    };
  }

  @Get(':id')
  async getRoadTraffic(@Param('id') id: string) {
    const roadTraffic = await this.roadTrafficService.getOne({ id: id });
    if (!roadTraffic)
      throw new BadRequestException('Road Traffic was not found.');
    return roadTraffic;
  }

  @Post()
  async createRoadTraffic(@Body() createRoadTrafficDto: CreateRoadTrafficDto) {
    return await this.roadTrafficService.create(createRoadTrafficDto);
  }

  @Patch(':id')
  async updateRoadTraffic(
    @Param('id') id: string,
    @Body() updateRoadTrafficDto: UpdateRoadTrafficDto,
  ) {
    const result = await this.roadTrafficService.update(
      id,
      updateRoadTrafficDto,
    );
    if (result.affected === 1) return 'Road Traffic has been updated.';
    throw new BadRequestException('Road Traffic was not updated.');
  }

  @Delete(':id')
  async deleteRoadTraffic(@Param('id') id: string) {
    return await this.roadTrafficService.delete(id);
  }
}
