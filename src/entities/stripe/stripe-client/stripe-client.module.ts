import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Stripe } from 'stripe';
import { STRIPE_CLIENT } from './constants';

@Module({})
export class StripeClientModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);
    const stripeClientProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    };

    return {
      module: StripeClientModule,
      providers: [stripeClientProvider],
      exports: [stripeClientProvider],
      global: true,
    };
  }
}
