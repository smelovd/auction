import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Bid } from './entities/bid.entity';
import { Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@WebSocketGateway()
export class BidsGateway {
  private readonly logger: Logger = new Logger(BidsGateway.name);
  constructor() {}

  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('joinAuction')
  async joinAuction(@ConnectedSocket() client: Socket, @MessageBody() itemId: string) {
    client.join(itemId);
    this.logger.log("Socket with id: " + client.id + " connected to item auction with id: " + itemId)
  }

  async pushBid(newBid: Bid, itemId: string) {
    console.log("to " + itemId + "sending: " + newBid);
    this.server.to(itemId).emit("newBid", newBid);
    this.logger.log("New Bid pushed to item with id: " + itemId)
  }
}
