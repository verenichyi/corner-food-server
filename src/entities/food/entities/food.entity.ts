import { Types } from 'mongoose';
import { Food } from '../food.schema';

export class FoodEntity extends Food{
  _id: Types.ObjectId;
}
