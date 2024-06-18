import { Global, Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { BidsGateway } from './bids.gateway';

@Global()
@Module({

  controllers: [BidsController],
  providers: [BidsService, BidsGateway],
  exports: [BidsService]
})
export class BidsModule {}
