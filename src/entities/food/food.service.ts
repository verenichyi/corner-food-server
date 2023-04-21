import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodEntity } from './entities/food.entity';
import { FoodDocument, Food } from './food.schema';
import { validateId } from '../../utils/validateId';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) {}

  async search(searchValue: string, foodType: string): Promise<FoodEntity[]> {
    if (!searchValue && !foodType) {
      return this.foodModel.find();
    }

    if (searchValue && !foodType) {
      return this.foodModel.find({
        $or: [
          { title: { $regex: searchValue, $options: 'i' } },
          { subtitle: { $regex: searchValue, $options: 'i' } },
        ],
      });
    }

    if (!searchValue && foodType) {
      return this.foodModel.find({
        tags: { $all: [foodType] },
      });
    }

    return this.foodModel.find({
      tags: { $all: [foodType] },
      $or: [
        { title: { $regex: searchValue, $options: 'i' } },
        { subtitle: { $regex: searchValue, $options: 'i' } },
      ],
    });
  }

  async getAll(): Promise<FoodEntity[]> {
    return this.foodModel.find();
  }

  async findById(id: string): Promise<FoodEntity> {
    validateId(id);

    const food = await this.foodModel.findById(id);
    if (!food) {
      throw new NotFoundException();
    }

    return food;
  }

  async create(
    image: Express.Multer.File,
    body: CreateFoodDto,
  ): Promise<FoodEntity> {
    const newFood = await new this.foodModel({
      ...body,
      image: `data:${image.mimetype};base64,${image.buffer.toString('base64')}`,
    });
    return newFood.save();
  }

  async update(
    id: string,
    image: Express.Multer.File,
    updateFoodDto: UpdateFoodDto,
  ): Promise<FoodEntity> {
    validateId(id);

    const food = await this.foodModel.findByIdAndUpdate(
      id,
      {
        ...updateFoodDto,
        image: `data:${image.mimetype};base64,${image.buffer.toString(
          'base64',
        )}`,
      },
      {
        new: true,
      },
    );

    if (!food) {
      throw new NotFoundException();
    }
    return food;
  }

  async delete(id: string): Promise<void> {
    validateId(id);

    const food = await this.foodModel.findByIdAndDelete(id);
    if (!food) {
      throw new NotFoundException();
    }
  }
}
