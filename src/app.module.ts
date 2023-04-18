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
import { StripeModule } from './entities/stripe/stripe.module';
import { OrderModule } from './entities/order/order.module';

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
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    }),
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
