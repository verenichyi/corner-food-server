import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFavoriteFoodDto } from './dto/create-favorite-food.dto';
import { FavoriteFoodEntity } from './entities/favorite-food.entity';
import { FavoriteFood, FavoriteFoodDocument } from './favorite-food.schema';
import { validateId } from '../../utils/validateId';
import { UsersService } from '../users/users.service';
import { FoodService } from '../food/food.service';

@Injectable()
export class FavoriteFoodService {
  constructor(
    @InjectModel(FavoriteFood.name)
    private favoriteFoodModel: Model<FavoriteFoodDocument>,
    private userService: UsersService,
    private foodService: FoodService,
  ) {}

  async search(
    id: string,
    searchValue: string,
    foodType: string,
  ): Promise<FavoriteFoodEntity[]> {
    if (!searchValue && !foodType) {
      return this.favoriteFoodModel
        .find({ user: id })
        .populate(['user', 'food']);
    }

    if (searchValue && !foodType) {
      const favoriteFood = await this.favoriteFoodModel
        .find({ user: id })
        .populate({ path: 'user' })
        .populate({
          path: 'food',
          match: {
            $or: [
              { title: { $regex: searchValue, $options: 'i' } },
              { subtitle: { $regex: searchValue, $options: 'i' } },
            ],
          },
        });

      return favoriteFood.filter((item) => item.food !== null);
    }

    if (!searchValue && foodType) {
      const favoriteFood = await this.favoriteFoodModel
        .find({ user: id })
        .populate({ path: 'user' })
        .populate({
          path: 'food',
          match: {
            tags: { $all: [foodType] },
          },
        });

      return favoriteFood.filter((item) => item.food !== null);
    }

    const favoriteFood = await this.favoriteFoodModel
      .find({ user: id })
      .populate({ path: 'user' })
      .populate({
        path: 'food',
        match: {
          tags: { $all: [foodType] },
          $or: [
            { title: { $regex: searchValue, $options: 'i' } },
            { subtitle: { $regex: searchValue, $options: 'i' } },
          ],
        },
      });

    return favoriteFood.filter((item) => item.food !== null);
  }

  async getAll(): Promise<FavoriteFoodEntity[]> {
    return this.favoriteFoodModel.find().populate(['user', 'food']);
  }

  async getAllByUserId(userId): Promise<FavoriteFoodEntity[]> {
    return this.favoriteFoodModel
      .find({ user: userId })
      .populate(['user', 'food']);
  }

  async getById(id: string): Promise<FavoriteFoodEntity> {
    validateId(id);

    const favoriteFood = await this.favoriteFoodModel
      .findById(id)
      .populate(['user', 'food']);
    if (!favoriteFood) {
      throw new NotFoundException();
    }

    return favoriteFood;
  }

  async create(body: CreateFavoriteFoodDto): Promise<FavoriteFoodEntity> {
    const user = await this.userService.findById(body.user);
    const food = await this.foodService.findById(body.food);

    if (!user || !food) {
      throw new UnprocessableEntityException();
    }

    const newFavoriteFood = await new this.favoriteFoodModel(body).populate([
      'user',
      'food',
    ]);
    return newFavoriteFood.save();
  }

  async delete(id: string): Promise<void> {
    validateId(id);

    const favoriteFood = await this.favoriteFoodModel.findByIdAndDelete(id);
    if (!favoriteFood) {
      throw new NotFoundException();
    }
  }
}
