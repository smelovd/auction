import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { BidsGateway } from './bids.gateway';
import { ItemsService } from '../items/items.service';

@Injectable()
export class BidsService {
  private readonly logger: Logger = new Logger(BidsService.name);
  constructor(
    @InjectRepository(Bid)
    private readonly bidsRepository: Repository<Bid>,
    private readonly itemsService: ItemsService,
    private readonly bidsGateway: BidsGateway,
  ) {}

  async create(createBidDto: CreateBidDto) {
    const item: Item = await this.itemsService.findOne(createBidDto.itemId);
    
    if (this.isPriceInvalid(item, createBidDto.price)) {
      this.logger.warn('Bid creation failed: Price is not enought!');
      throw new BadRequestException('Price is not enought!');
    }

    const newBid: Bid = {
      id: null,
      price: createBidDto.price,
      date: new Date(),
      item: item,
      user: null,
    };

    try {
      const insertedBid = await this.bidsRepository.insert(newBid);
      this.logger.log('Bid created with id: ' + insertedBid.raw);
      this.bidsGateway.pushBid(newBid, createBidDto.itemId.toString());
      return insertedBid.raw;
    } catch (e) {
      this.logger.warn('Bid creation failed');
      throw new BadRequestException('Price is not enought!');
    }
  }

  private isPriceInvalid(item: Item, price: number): boolean {
    if (item.bids?.length > 0) {
      return (
        item.startPrice > price ||
        Math.max(...item.bids.map((bid) => bid.price)) >= price
      );
    }

    return item.startPrice > price;
  }

  async findOne(id: number) {
    try {
      const bid = this.bidsRepository.findOne({
        where: { id: id },
        relations: ['item'],
      });
      this.logger.log('Bid found with id: ' + id);
      return bid;
    } catch (e) {
      this.logger.warn('Bid not found: ' + id);
      throw new NotFoundException('Bid not found!');
    }
  }
}
