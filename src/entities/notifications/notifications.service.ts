import { Injectable } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { Notification } from './entities/notification.entity';
import * as moment from 'moment';

const enum StatusList {
  Processing = 'processing',
  Preparing = 'preparing',
  Delivering = 'delivering',
}

const getOrderStatus = (deliveryTime: number, orderCreatedAt: Date): string => {
  const deliveryTimeInSeconds = deliveryTime * 60;
  const processingTimeInSeconds = (deliveryTimeInSeconds * 10) / 100;
  const preparingTimeInSeconds = (deliveryTimeInSeconds * 50) / 100;
  const deliveringTimeInSeconds = (deliveryTimeInSeconds * 40) / 100;

  const processingDueDate = moment(orderCreatedAt).add(
    processingTimeInSeconds,
    's',
  );
  const preparingDueDate = moment(orderCreatedAt)
    .add(processingTimeInSeconds, 's')
    .add(preparingTimeInSeconds, 's');
  const deliveringDueDate = moment(orderCreatedAt)
    .add(processingTimeInSeconds, 's')
    .add(preparingTimeInSeconds, 's')
    .add(deliveringTimeInSeconds, 's');

  const isProcessingTime = moment().isBefore(processingDueDate);
  const isPreparingTime = moment().isBetween(
    processingDueDate,
    preparingDueDate,
  );
  const isDeliveringTime = moment().isBetween(
    preparingDueDate,
    deliveringDueDate,
  );

  if (isProcessingTime) {
    return StatusList.Processing;
  } else if (isPreparingTime) {
    return StatusList.Preparing;
  } else if (isDeliveringTime) {
    return StatusList.Delivering;
  }
};

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
