import { OrderEntity } from '../../order/entities/order.entity';

export class Notification {
  status: string;
  order: OrderEntity;
}
