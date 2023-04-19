import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as dotenv from 'dotenv';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './entities/auth/auth.module';
import { FoodTypeModule } from './entities/food-type/food-type.module';
import { FoodModule } from './entities/food/food.module';
import { FilesModule } from './entities/files/files.module';
import { FavoriteFoodModule } from './entities/favorite-food/favorite-food.module';
import { StripeClientModule } from './entities/stripe/stripe-client/stripe-client.module';
import { OrderModule } from './entities/order/order.module';
import { StripeModule } from './entities/stripe/stripe.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join('..', '.env'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    StripeClientModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    }),
    StripeModule,
    UsersModule,
    AuthModule,
    FoodTypeModule,
    FoodModule,
    FilesModule,
    FavoriteFoodModule,
    OrderModule,
  ],
})
export class AppModule {}
