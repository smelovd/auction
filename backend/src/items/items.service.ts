import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createBidDto: CreateItemDto) {
    const newItem = new Item();
    newItem.title = createBidDto.title;
    return await this.itemsRepository.insert(newItem);
  }

  async findAll() {
    return await this.itemsRepository.find({ relations: ['bids'] });
  }

  async findOne(id: number) {
    return await this.itemsRepository.findOne({ where: { id: id }, relations: ['bids'] });
  }

  async update(id: number, updateBidDto: UpdateItemDto) {
    const item = await this.findOne(updateBidDto.id);
    item.title = updateBidDto.title;
    return await this.itemsRepository.update({id: updateBidDto.id}, item);
  }

  async remove(id: number) {
    return await this.itemsRepository.remove(await this.findOne(id));
  }
}
