import { Bid } from "src/bids/entities/bid.entity";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    username: string;

    @OneToMany(() => Bid, (bid) => bid.user)
    bids: Bid[];
}
