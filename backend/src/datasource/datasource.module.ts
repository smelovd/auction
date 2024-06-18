import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from 'src/bids/entities/bid.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  // providers: [
  //     {
  //         provide: DataSource,
  //         inject: [],
  //         useFactory: async () => {
  //             try {
  //                 const dataSource = new DataSource({
  //                     type: 'sqlite',
  //                     // host: 'localhost',
  //                     // port: 5432,
  //                     // username: 'root',
  //                     // password: 'password',
  //                     database: 'database',
  //                     synchronize: true,
  //                     entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  //                 });
  //                 await dataSource.initialize();
  //                 return dataSource;
  //             } catch (e) {
  //                 console.log("Database connection failed!");
  //                 throw e;
  //             }
  //         },
  //     }
  // ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database',
      synchronize: true,
      entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
    }),
    TypeOrmModule.forFeature([User, Bid, Item])
  ],
  exports: [TypeOrmModule],
})
export class DatasourceModule {}
