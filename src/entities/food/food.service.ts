import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodEntity } from './food.entity';
import { FoodDocument, Food } from './food.schema';
import { FilesService } from '../files/files.service';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private foodModel: Model<FoodDocument>,
  ) {}

  async getAll(): Promise<FoodEntity[]> {
    return this.foodModel.find();
  }

  async findById(id: string): Promise<FoodEntity> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

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
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException();
    }

    const food = await this.foodModel.findByIdAndDelete(id);
    if (!food) {
      throw new NotFoundException();
    }
  }
}
