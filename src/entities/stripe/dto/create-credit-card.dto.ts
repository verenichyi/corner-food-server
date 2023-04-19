import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCreditCardDto {
  @IsNotEmpty()
  @IsString()
  paymentMethodId: string;

  @IsNotEmpty()
  @IsString()
  stripeCustomerId: string;
}
