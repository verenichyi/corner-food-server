import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodService } from './food.service';
import { FoodEntity } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('search')
  async search(
    @Query('searchValue') searchValue: string,
    @Query('foodType') foodType: string,
  ): Promise<FoodEntity[]> {
    return await this.foodService.search(searchValue, foodType);
  }

  @Get()
  async getAll(): Promise<FoodEntity[]> {
    return await this.foodService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<FoodEntity> {
    return await this.foodService.findById(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @Body() body: CreateFoodDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<FoodEntity> {
    return await this.foodService.create(image, body);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<FoodEntity> {
    return await this.foodService.update(id, image, updateFoodDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.foodService.delete(id);
  }
}
