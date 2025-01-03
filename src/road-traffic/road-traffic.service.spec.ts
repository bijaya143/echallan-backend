import { Test, TestingModule } from '@nestjs/testing';
import { RoadTrafficService } from './road-traffic.service';

describe('RoadTrafficService', () => {
  let service: RoadTrafficService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoadTrafficService],
    }).compile();

    service = module.get<RoadTrafficService>(RoadTrafficService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
