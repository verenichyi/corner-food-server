import { Inject, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { STRIPE_CLIENT } from './stripe-client/constants';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';


@Injectable()
export class StripeService {
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}

  async createCustomer(name: string, email: string) {
    return await this.stripe.customers.create({
      name,
      email,
    });
  }

  async attachCreditCard(
    createCreditCardDto: CreateCreditCardDto,
  ): Promise<string> {
    const { client_secret } = await this.stripe.setupIntents.create({
      customer: createCreditCardDto.stripeCustomerId,
      payment_method: createCreditCardDto.paymentMethodId,
    });

    return client_secret;
  }

  async listCreditCards(customerId: string): Promise<Stripe.PaymentMethod[]> {
    const object = await this.stripe.customers.listPaymentMethods(`${customerId}`, {
      type: 'card',
    });

    return object.data;
  }

  async charge(
    totalPrice: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount: totalPrice * 100,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: 'usd',
      off_session: true,
      confirm: true,
    });
  }

  async constructEventFromPayload(signature: string, payload: Buffer) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  }
}
