import { Types } from 'mongoose';
import { FoodTypeType } from './dto/create-food-type.dto';

export class FoodTypeEntity {
  _id: Types.ObjectId;
  value: FoodTypeType;
}
