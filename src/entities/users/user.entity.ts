import { Types } from 'mongoose';

export class UserEntity {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
}
