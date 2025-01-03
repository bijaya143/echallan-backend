import { Test, TestingModule } from '@nestjs/testing';
import { RoadTrafficController } from './road-traffic.controller';

describe('RoadTrafficController', () => {
  let controller: RoadTrafficController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoadTrafficController],
    }).compile();

    controller = module.get<RoadTrafficController>(RoadTrafficController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
