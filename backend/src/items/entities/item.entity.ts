import { Bid } from "src/bids/entities/bid.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("items")
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('decimal')
    startPrice: number;

    @Column()
    isSold: boolean;

    @Column()
    deadline: Date;

    @OneToMany(() => Bid, (bid) => bid.item)
    bids: Bid[];

    @ManyToOne(() => User, (user) => user.items)
    user: User
}
