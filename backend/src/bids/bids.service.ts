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
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class BidsService {
  private readonly logger: Logger = new Logger(BidsService.name);
  constructor(
    @InjectRepository(Bid)
    private readonly bidsRepository: Repository<Bid>,
    private readonly itemsService: ItemsService,
    private readonly usersService: UsersService,
    private readonly bidsGateway: BidsGateway,
  ) {}

  async create(createBidDto: CreateBidDto, userId: any) {
    const item: Item = await this.itemsService.findOne(createBidDto.itemId);
    const user: User = await this.usersService.findOne(userId);
    
    if (this.isPriceInvalid(item, createBidDto.price) || this.isTimeout(item.deadline)) {
      this.logger.warn('Bid creation failed: Price is not enought!');
      throw new BadRequestException('Bid creation failed!');
    }

    const newBid: Bid = {
      id: null,
      price: createBidDto.price,
      date: new Date(),
      item: item,
      user: user,
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

  private isTimeout(deadline: Date): boolean {
    return deadline.getTime() <= new Date().getTime();
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
