import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export type FoodTypeType =
  | 'Pizza'
  | 'Pasta'
  | 'Salads'
  | 'Dessert'
  | 'Drinks'
  | 'Sauces'
  | 'Sides';

export const validFoodTypes: FoodTypeType[] = [
  'Pizza',
  'Pasta',
  'Salads',
  'Dessert',
  'Drinks',
  'Sauces',
  'Sides',
];

export class CreateFoodTypeDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(validFoodTypes)
  value: string;
}
