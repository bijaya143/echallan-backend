import { Module } from '@nestjs/common';
import { RoadTrafficService } from './road-traffic.service';
import { RoadTrafficController } from './road-traffic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadTraffic } from './entity/road-traffic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoadTraffic])],
  providers: [RoadTrafficService],
  controllers: [RoadTrafficController],
  exports: [RoadTrafficService],
})
export class RoadTrafficModule {}
