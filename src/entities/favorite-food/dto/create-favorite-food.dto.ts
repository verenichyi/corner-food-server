import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateFavoriteFoodDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  food: string;
}
