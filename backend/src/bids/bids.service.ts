import { Injectable } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { Repository } from 'typeorm';
import { Bid } from './entities/bid.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BidsService {
  constructor(
    @InjectRepository(Bid)
    private readonly bidsRepository: Repository<Bid>,
  ) {}

  create(createBidDto: CreateBidDto) {
    return this.bidsRepository.create(createBidDto);
  }

  findAll() {
    return this.bidsRepository.find();
  }

  findOne(id: number) {
    return this.bidsRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateBidDto: UpdateBidDto) {
    return this.bidsRepository.update(id, updateBidDto);
  }

  async remove(id: number) {
    return this.bidsRepository.remove(await this.findOne(id));
  }
}
