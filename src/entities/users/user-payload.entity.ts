import { Types } from 'mongoose';

export class UserPayloadEntity {
  _id: Types.ObjectId;
  username: string;
  email: string;
}
