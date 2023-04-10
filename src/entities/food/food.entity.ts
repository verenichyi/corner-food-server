import { Types } from 'mongoose';
import { FoodTypeType } from '../food-type/dto/create-food-type.dto';

export class FoodEntity {
  _id: Types.ObjectId;
  tags: FoodTypeType[];
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: number;
  deliverTime: number;
  price: number;
}
