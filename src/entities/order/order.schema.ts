import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as moment from 'moment';
import { User } from '../users/user.schema';
import { Food } from '../food/food.schema';
import { getRandomInt } from '../../utils/getRandomInt';

@Schema({ versionKey: false })
export class Order {
  @Prop({ type: Types.ObjectId, ref: User.name, required: false })
  user: string;

  @Prop({
    type: [
      {
        amount: { type: Number, required: true },
        product: { type: Types.ObjectId, ref: Food.name, required: true },
      },
    ],
    _id: false,
  })
  orderItems: Object;

  @Prop({
    type: {
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    _id: false,
  })
  shippingAddress: Object;

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({
    type: Date,
    default() {
      return moment();
    },
  })
  orderCreatedAt: Date;

  @Prop({
    type: Number,
    default() {
      return getRandomInt(5, 10);
    },
  })
  deliveryTime: number;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
