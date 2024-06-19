import { Global, Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Global()
@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
