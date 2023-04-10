import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export function validateId(id: string): void | never {
	if (!Types.ObjectId.isValid(id)) {
		throw new BadRequestException();
	}
}