import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.usersRepository.find();
      this.logger.log('Users found!');
      return users;
    } catch (e) {
      this.logger.warn('Users not found');
      throw new NotFoundException('Users not found!');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOne({ where: { id: id } });
      this.logger.log('User found with id: ' + id);
      return user;
    } catch (e) {
      this.logger.warn('User not found with id: ' + id);
      throw new NotFoundException('User not found!');
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOne({ where: { username: username } });
      this.logger.log('User found with username: ' + username);
      return user;
    } catch (e) {
      this.logger.warn('User not found with username: ' + username);
      throw new NotFoundException('User not found!');
    }
  }

  async update(id: number, updateBidDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateBidDto);
  }

  async insert(user: User) {
    try {
      const res = await this.usersRepository.insert(user);
      return res.raw;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async remove(id: number) {
    return this.usersRepository.remove(await this.findOne(id));
  }
}
