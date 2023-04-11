import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FavoriteFoodService } from './favorite-food.service';
import { FavoriteFoodEntity } from './favorite-food.entity';
import { CreateFavoriteFoodDto } from './dto/create-favorite-food.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorite-food')
export class FavoriteFoodController {
  constructor(private readonly favoriteFoodService: FavoriteFoodService) {}

  @Get(':id/search')
  async search(
    @Param('id') id: string,
    @Query('searchValue') searchValue: string,
    @Query('foodType') foodType: string,
  ): Promise<FavoriteFoodEntity[]> {
    return await this.favoriteFoodService.search(id, searchValue, foodType);
  }

  @Get()
  async getAll(): Promise<FavoriteFoodEntity[]> {
    return await this.favoriteFoodService.getAll();
  }

  @Get('user/:id')
  async getAllByUserId(@Param('id') id: string): Promise<FavoriteFoodEntity[]> {
    return await this.favoriteFoodService.getAllByUserId(id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<FavoriteFoodEntity> {
    return await this.favoriteFoodService.getById(id);
  }

  @Post()
  async create(
    @Body() body: CreateFavoriteFoodDto,
  ): Promise<FavoriteFoodEntity> {
    return await this.favoriteFoodService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.favoriteFoodService.delete(id);
  }
}
