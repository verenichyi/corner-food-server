import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Stripe } from 'stripe';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Controller('')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('credit-cards')
  @UseGuards(JwtAuthGuard)
  async attachCreditCard(
    @Body()
    createCreditCardDto: CreateCreditCardDto,
  ): Promise<string> {
    return this.stripeService.attachCreditCard(createCreditCardDto);
  }

  @Get('credit-cards/:id')
  @UseGuards(JwtAuthGuard)
  async listCreditCards(
    @Param('id') id: string,
  ): Promise<Stripe.PaymentMethod[]> {
    return await this.stripeService.listCreditCards(id);
  }

  @Post('webhook')
  async handleIncomingEvents(@Req() request: RawBodyRequest<Request>) {
    const signature = request.headers['stripe-signature'];
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = await this.stripeService.constructEventFromPayload(
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
