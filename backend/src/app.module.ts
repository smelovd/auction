import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { BidsModule } from './bids/bids.module';
import { DatasourceModule } from './datasource/datasource.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ItemsModule, BidsModule, DatasourceModule, AuthModule],
})
export class AppModule {}
