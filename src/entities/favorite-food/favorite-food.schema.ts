import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Food } from '../food/food.schema';

@Schema({ versionKey: false })
export class FavoriteFood {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ type: Types.ObjectId, ref: Food.name })
  food: string;
}

export type FavoriteFoodDocument = HydratedDocument<FavoriteFood>;
export const FavoriteFoodSchema = SchemaFactory.createForClass(FavoriteFood);
