import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  async create(@Body() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

  @Get()
  async findAll() {
    return this.bidsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bidsService.findOne(+id);
  }
}
