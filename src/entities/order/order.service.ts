import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { STRIPE_CLIENT } from '../stripe/constants';
import { Stripe } from 'stripe';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}

  async createPaymentIntent(orderDto: CreateOrderDto) {
    const { orderItems, shippingAddress, totalPrice, userId } = orderDto;

    const order = new this.orderModel({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod: 'stripe',
      totalPrice,
    });

    await order.save();

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'usd',

    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  async constructEventFromPayload(signature: string, payload: Buffer) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  }
}
