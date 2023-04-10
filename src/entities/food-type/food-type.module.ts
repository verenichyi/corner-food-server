import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodTypeController } from './food-type.controller';
import { FoodTypeService } from './food-type.service';
import { FoodType, FoodTypeSchema } from './food-type.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FoodTypeController],
  providers: [FoodTypeService],
  imports: [
    MongooseModule.forFeature([
      { name: FoodType.name, schema: FoodTypeSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [FoodTypeService],
})
export class FoodTypeModule {}
