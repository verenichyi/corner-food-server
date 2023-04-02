import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
