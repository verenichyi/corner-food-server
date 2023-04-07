import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';
import { FoodTypeEntity } from './food-type.entity';
import { FoodType, FoodTypeDocument } from './food-type.schema';

@Injectable()
export class FoodTypeService {
  constructor(
    @InjectModel(FoodType.name) private foodTypeModel: Model<FoodTypeDocument>,
  ) {}

  async getAll(): Promise<FoodTypeEntity[]> {
    return this.foodTypeModel.find();
  }

  async createFoodType(body: CreateFoodTypeDto): Promise<FoodTypeEntity> {
    const foodType = await this.foodTypeModel.findOne({ value: body.value });
    if (foodType) {
      throw new ConflictException('This food type already exists');
    }

    const newFoodType = await new this.foodTypeModel({ ...body });
    return newFoodType.save();
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const deletedFoodType = await this.foodTypeModel.findByIdAndDelete(id);
    if (!deletedFoodType) {
      throw new NotFoundException();
    }
  }
}