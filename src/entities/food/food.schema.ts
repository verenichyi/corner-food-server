import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FoodTypeType } from '../food-type/dto/create-food-type.dto';

@Schema({ versionKey: false })
export class Food {
  @Prop({ type: [String], required: true })
  tags: FoodTypeType[];

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true  })
  subtitle: string;

  @Prop({ type: String, required: true  })
  description: string;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: Number, required: true })
  deliverTime: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String })
  image: string;
}

export type FoodDocument = HydratedDocument<Food>;
export const FoodSchema = SchemaFactory.createForClass(Food);
