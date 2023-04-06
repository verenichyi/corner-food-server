import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodTypeController } from './food-type.controller';
import { FoodTypeService } from './food-type.service';
import { FoodType, FoodTypeSchema } from './food-type.schema';

@Module({
  controllers: [FoodTypeController],
  providers: [FoodTypeService],
  imports: [
    MongooseModule.forFeature([
      { name: FoodType.name, schema: FoodTypeSchema },
    ]),
  ],
})
export class FoodTypeModule {}
