import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  HttpCode,
} from '@nestjs/common';
import { FoodTypeService } from './food-type.service';
import { FoodTypeEntity } from './food-type.entity';
import { CreateFoodTypeDto } from './dto/create-food-type.dto';

@Controller('food-type')
export class FoodTypeController {
  constructor(private readonly foodTypeService: FoodTypeService) {}

  @Get()
  async getAll(): Promise<FoodTypeEntity[]> {
    return await this.foodTypeService.getAll();
  }

  @Post()
  async create(@Body() body: CreateFoodTypeDto): Promise<FoodTypeEntity> {
    return await this.foodTypeService.createFoodType(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.foodTypeService.deleteFoodType(id);
  }
}
