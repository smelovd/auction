import { Bid } from "src/bids/entities/bid.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("items")
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    title: string;

    isSold: boolean;

    deadline: Timestamp;

    @OneToMany(() => Bid, (bid) => bid.item)
    bids: Bid[];
}
