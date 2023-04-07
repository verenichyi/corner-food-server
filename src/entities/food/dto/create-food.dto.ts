import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsIn,
} from 'class-validator';
import { validFoodTypes } from '../../food-type/dto/create-food-type.dto';

export class CreateFoodDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(validFoodTypes, { each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsNotEmpty()
  @IsString()
  deliverTime: string;

  @IsNotEmpty()
  @IsString()
  price: string;
}
