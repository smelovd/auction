import { Bid } from "src/bids/entities/bid.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("items")
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column('decimal', { nullable: true })
    startPrice: number;

    @Column({ nullable: true })
    isSold: boolean;

    @Column({ nullable: true })
    deadline: Date;

    @OneToMany(() => Bid, (bid) => bid.item)
    bids: Bid[];
}
