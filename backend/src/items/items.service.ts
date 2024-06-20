import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ItemsService {
  private readonly logger: Logger = new Logger(ItemsService.name);
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly usersService: UsersService,
  ) {}

  async create(createBidDto: CreateItemDto, userId: any): Promise<number> {
    const user: User = await this.usersService.findOne(userId);

    const newItem: Item = {
      id: null,
      title: createBidDto.title,
      startPrice: createBidDto.startPrice,
      isSold: false,
      deadline: this.getMonthLater(),
      bids: [],
      user: user,
    };

    try {
      const insertedData = await this.itemsRepository.insert(newItem);
      this.logger.log('New item created with id: ' + newItem.id);
      return insertedData.raw;
    } catch (e) {
      this.logger.warn('New item creation failed!');
      throw new BadRequestException();
    }
  }

  private getMonthLater(): Date {
    const now = new Date();
    return now.getMonth() == 11
      ? new Date(now.getFullYear() + 1, 0, 1)
      : new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  async findAll(): Promise<Item[]> {
    //TODO pagination
    try {
      const items = await this.itemsRepository.find({ relations: ['bids'] });
      this.logger.log('Item found');
      return items;
    } catch (e) {
      this.logger.warn('Items not found!');
      throw new NotFoundException('Items not found!');
    }
  }

  async findOne(id: number): Promise<Item> {
    try {
      const item = await this.itemsRepository
        .createQueryBuilder('item')
        .leftJoinAndSelect('item.bids', 'bid')
        .where('item.id = :id', { id: id })
        .orderBy('bid.date', 'DESC')
        .limit(10)
        .getOne();
      return item;
    } catch (e) {
      this.logger.warn('Item not found with id: ' + id);
      throw new NotFoundException('Item not found!');
    }
  }
}
