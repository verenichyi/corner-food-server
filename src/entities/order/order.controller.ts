import {
  BadRequestException,
  Body,
  Controller,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('')
export class OrderController {
  constructor(private readonly paymentService: OrderService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: CreateOrderDto) {
    return await this.paymentService.createPaymentIntent(body);
  }

  @Post('webhook')
  async handleIncomingEvents(@Req() request: RawBodyRequest<Request>) {
    const signature = request.headers['stripe-signature'];
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.paymentService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent} was successful!`);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log(
          `successful attachment of a ${paymentMethod} PaymentMethod.`,
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
  }
}
