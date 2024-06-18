import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { BidsGateway } from './bids.gateway';

@Module({
  controllers: [BidsController],
  providers: [BidsService, BidsGateway],
})
export class BidsModule {}
