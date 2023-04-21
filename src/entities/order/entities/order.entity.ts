import { Order } from '../order.schema';
import { Types } from 'mongoose';

export class OrderEntity extends Order {
  _id: Types.ObjectId;
}
