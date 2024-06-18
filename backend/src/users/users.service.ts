import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createBidDto: CreateUserDto) {
    return this.usersRepository.create(createBidDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateBidDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateBidDto);
  }

  async remove(id: number) {
    return this.usersRepository.remove(await this.findOne(id));
  }
}
