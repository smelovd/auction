import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Bid } from './entities/bid.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('bids')
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @UseGuards(AuthGuard)
  @ApiBadRequestResponse({
    type: "Bad request!"
  })
  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Post()
  async create(@Body() createBidDto: CreateBidDto, @Req() req): Promise<number> {
    return this.bidsService.create(createBidDto, req.sub);
  }

  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Bid> {
    return this.bidsService.findOne(+id);
  }
}
