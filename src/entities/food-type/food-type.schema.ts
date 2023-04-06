import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FoodTypeType } from './dto/create-food-type.dto';

@Schema({ versionKey: false })
export class FoodType {
  @Prop({ type: String, required: true })
  value: FoodTypeType;
}

export type FoodTypeDocument = HydratedDocument<FoodType>;
export const FoodTypeSchema = SchemaFactory.createForClass(FoodType);
