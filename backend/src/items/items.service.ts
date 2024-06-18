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

  create(createBidDto: CreateItemDto) {
    return this.itemsRepository.create(createBidDto);
  }

  findAll() {
    return this.itemsRepository.find();
  }

  findOne(id: number) {
    return this.itemsRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateBidDto: UpdateItemDto) {
    return this.itemsRepository.update(id, updateBidDto);
  }

  async remove(id: number) {
    return this.itemsRepository.remove(await this.findOne(id));
  }
}
