import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { AuthModule } from '../auth/auth.module';
import { StripeClientModule } from './stripe-client/stripe-client.module';
import { Order, OrderSchema } from '../order/order.schema';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => StripeClientModule),
  ],
  exports: [StripeService],
})
export class StripeModule {}
