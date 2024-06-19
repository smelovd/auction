import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidsRepository: Repository<Bid>,
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createBidDto: CreateBidDto) {
    const newBid = new Bid();
    newBid.price = createBidDto.price;
    newBid.item = await this.itemsRepository.findOne({ where: { id: createBidDto.itemId } });
    return this.bidsRepository.insert(newBid);
  }

  async findAll() {
    return await this.bidsRepository.find({ relations: ['item'] });
  }

  async findAllByItemId(itemId: number) {
    await this.bidsRepository.find({ where: { item: { id: itemId } }, relations: ['item'] });
  }

  async findOne(id: number) {
    return await this.bidsRepository.findOne({ where: { id: id }, relations: ['item'] });
  }
}
