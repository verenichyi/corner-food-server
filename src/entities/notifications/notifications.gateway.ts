import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { Events } from './constants/events';

@WebSocketGateway({
  cors: { origin: process.env.CLIENT_URI },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationsService: NotificationsService) {}

  @SubscribeMessage(Events.FindUserActiveOrders)
  async findUserActiveOrders(
    @MessageBody('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<Notification[]> {
    setInterval(async () => {
      const orders = await this.notificationsService.findUserActiveOrders(
        userId,
      );

      client.emit(Events.UpdateUserActiveOrders, orders);
    }, 60 * 1000);

    return this.notificationsService.findUserActiveOrders(userId);
  }
}
