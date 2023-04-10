import { ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../user.schema';

export async function checkUserForDatabaseMatches(
  email: string,
  userModel: Model<UserDocument>,
  userId?: string,
): Promise<void | never> {
  const userByEmail = await userModel.findOne({ email });

  if (userId) {
    if (userByEmail && userByEmail._id.toString() !== userId) {
      throw new ConflictException();
    }

    return;
  }

  if (userByEmail) {
    throw new ConflictException();
  }
}
