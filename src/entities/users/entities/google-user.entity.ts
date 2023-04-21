import { Types } from 'mongoose';

export class GoogleUserEntity {
  _id: Types.ObjectId;
  username: string;
  email: string;
  profileImage: string;
  stripeCustomerId: string;
}
