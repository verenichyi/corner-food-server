import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stripe } from 'stripe';
import { Order, OrderDocument } from './order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private stripeService: StripeService,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<Stripe.PaymentIntent> {
    const {
      userId,
      stripeCustomerId,
      paymentMethodId,
      totalPrice,
      orderItems,
      shippingAddress,
    } = orderDto;

    const order = new this.orderModel({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod: paymentMethodId,
      totalPrice,
    });

    await order.save();

    return await this.stripeService.charge(
      totalPrice,
      paymentMethodId,
      stripeCustomerId,
    );
  }
}
