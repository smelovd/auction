import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class BidsGateway {
  constructor(private readonly bidsService: BidsService,
    // @WebSocketServer()
    // private readonly server: Server;
  ) {}

  @SubscribeMessage('createBid')
  async create(@MessageBody() createBidDto: CreateBidDto) {
    return this.bidsService.create(createBidDto);
  }

  @SubscribeMessage('findAllBids')
  async findAll() {
    return this.bidsService.findAll();
  }

  @SubscribeMessage('findAllBidsByItemId')
  async findOne(@MessageBody() id: number) {
    return this.bidsService.findAllByItemId(id);
  }
}
