import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Food } from '../food/food.schema';

@Schema({ versionKey: false, timestamps: true })
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
  })
  orderItems: Object;

  @Prop({
    type: {
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
  })
  shippingAddress: Object;

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({
    type: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  })
  paymentResult: Object;

  @Prop({ type: Number, required: true, default: 0.0 })
  taxPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  shippingPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ type: Boolean, required: true, default: false })
  isPaid: boolean;

  @Prop({ type: Date })
  paidAt: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isDelivered: boolean;

  @Prop({ type: Date })
  deliveredAt: Date;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
