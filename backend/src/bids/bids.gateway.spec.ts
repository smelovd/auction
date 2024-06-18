import { Test, TestingModule } from '@nestjs/testing';
import { BidsGateway } from './bids.gateway';
import { BidsService } from './bids.service';

describe('BidsGateway', () => {
  let gateway: BidsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BidsGateway],
    }).compile();

    gateway = module.get<BidsGateway>(BidsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
