import { Item } from "src/items/entities/item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("bids")
export class Bid {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal')
    price: number;

    @Column()
    date: Date;

    @ManyToOne(() => Item, (item) => item.bids)
    item: Item;

    @ManyToOne(() => User, (user) => user.bids)
    user: User;
}
