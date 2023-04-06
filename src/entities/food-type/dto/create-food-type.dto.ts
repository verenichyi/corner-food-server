import { IsNotEmpty, IsString } from 'class-validator';

export type FoodTypeType =
  | 'Fast Food'
  | 'Vegetarian'
  | 'Drink'
  | 'Spicy'
  | 'Salty'
  | 'Sour';

export class CreateFoodTypeDto {
  @IsString()
  @IsNotEmpty()
  value: FoodTypeType;
}
