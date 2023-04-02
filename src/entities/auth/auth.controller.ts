import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { StatusCodes } from 'http-status-codes';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserPayloadEntity } from '../users/user-payload.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  async checkAuth(@Req() request: Request & { user: UserPayloadEntity }) {
    return await this.authService.checkAuth(request.user);
  }

  @HttpCode(StatusCodes.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/registration')
  async registration(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registration(registerDto);
  }
}
