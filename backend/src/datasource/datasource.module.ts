import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from 'src/bids/entities/bid.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 5432,
      // username: 'root',
      // password: 'password',
      database: 'database.db',
      synchronize: true,
      entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
    }),
    TypeOrmModule.forFeature([User, Bid, Item])
  ],
  exports: [TypeOrmModule],
})
export class DatasourceModule {}
