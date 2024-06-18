import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Bid } from './entities/bid.entity';

@ApiTags('bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @ApiBadRequestResponse({
    type: "Bad request!"
  })
  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Post()
  async create(@Body() createBidDto: CreateBidDto): Promise<number> {
    return this.bidsService.create(createBidDto);
  }

  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bid> {
    return this.bidsService.findOne(+id);
  }
}
