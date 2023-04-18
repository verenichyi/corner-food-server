import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFoodDto } from '../../food/dto/create-food.dto';

class Product extends CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}

class OrderItem {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @Type(() => Product)
  product: Product;
}

class ShippingAddress {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => OrderItem)
  orderItems: OrderItem[];

  @Type(() => ShippingAddress)
  shippingAddress: ShippingAddress;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
