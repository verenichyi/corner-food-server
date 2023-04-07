import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export type FoodTypeType =
  | 'Fast Food'
  | 'Vegetarian'
  | 'Drink'
  | 'Spicy'
  | 'Salty'
  | 'Sour';

export const validFoodTypes: FoodTypeType[] = [
  'Fast Food',
  'Vegetarian',
  'Drink',
  'Spicy',
  'Salty',
  'Sour',
];

export class CreateFoodTypeDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(validFoodTypes)
  value: string;
}
