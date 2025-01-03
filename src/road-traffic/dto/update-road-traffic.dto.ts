import { PartialType } from '@nestjs/swagger';
import { CreateRoadTrafficDto } from './create-road-traffic.dto';

export class UpdateRoadTrafficDto extends PartialType(CreateRoadTrafficDto) {}
