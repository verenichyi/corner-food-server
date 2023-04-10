import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteFoodController } from './favorite-food.controller';
import { FavoriteFoodService } from './favorite-food.service';
import { FavoriteFood, FavoriteFoodSchema } from './favorite-food.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { FoodModule } from '../food/food.module';

@Module({
  controllers: [FavoriteFoodController],
  providers: [FavoriteFoodService],
  imports: [
    MongooseModule.forFeature([
      { name: FavoriteFood.name, schema: FavoriteFoodSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => FoodModule),
  ],
  exports: [FavoriteFoodService],
})
export class FavoriteFoodModule {}
