import { Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { Notification } from './entities/notification.entity';
import { getOrderStatus } from '../../utils/getOrderStatus';

@Injectable()
export class NotificationsService {
  constructor(private readonly orderService: OrderService) {}

  async findUserActiveOrders(userId: string): Promise<Notification[]> {
    const orders = await this.orderService.findUserActiveOrders(userId);

    return orders.map((order) => {
      const status = getOrderStatus(order.deliveryTime, order.orderCreatedAt);

      return {
        status,
        order,
      };
    });
  }
}
