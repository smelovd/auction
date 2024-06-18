import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Bid } from "src/bids/entities/bid.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Exclude()
    @Column()
    password: string;

    @OneToMany(() => Bid, (bid) => bid.user)
    bids: Bid[];
    
    @OneToMany(() => Item, (item) => item.user)
    items: Item[]
}
