import { Types } from 'mongoose';

export class FavoriteFoodEntity {
  _id: Types.ObjectId;
  user: string;
  food: string;
}
