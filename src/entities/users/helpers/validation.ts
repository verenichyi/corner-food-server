import { BadRequestException, ConflictException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { UserDocument } from '../user.schema';
import exceptions from '../constants/exceptions';

const { InvalidIdBadRequest, Conflict } = exceptions;

export function isIdValid(id: string): void | never {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException(InvalidIdBadRequest);
  }
}

export async function checkUserForDatabaseMatches(
  username: string,
  email: string,
  userModel: Model<UserDocument>,
  userId?: string,
): Promise<void | never> {
  const userByName = await userModel.findOne({
    username,
  });
  const userByEmail = await userModel.findOne({ email });

  if (userId) {
    if (
      (userByName && userByName._id.toString() !== userId) ||
      (userByEmail && userByEmail._id.toString() !== userId)
    ) {
      throw new ConflictException(Conflict);
    }

    return;
  }

  if (userByName || userByEmail) {
    throw new ConflictException(Conflict);
  }
}
