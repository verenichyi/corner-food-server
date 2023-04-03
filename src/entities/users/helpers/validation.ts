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
  email: string,
  userModel: Model<UserDocument>,
  userId?: string,
): Promise<void | never> {
  const userByEmail = await userModel.findOne({ email });

  if (userId) {
    if (userByEmail && userByEmail._id.toString() !== userId) {
      throw new ConflictException(Conflict);
    }

    return;
  }

  if (userByEmail) {
    throw new ConflictException(Conflict);
  }
}
