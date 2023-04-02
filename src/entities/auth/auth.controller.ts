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
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { GoogleAuthGuard } from '../../guards/google-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/check')
  async checkAuth(@Req() request) {
    return await this.authService.checkAuth(request.user);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(StatusCodes.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/login/google')
  async loginWithGoogle() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/login/google/callback')
  async loginWithGoogleRedirectCallback(@Req() request) {
    return await this.authService.authGoogle(request.user);
  }

  @HttpCode(StatusCodes.CREATED)
  @Post('/registration')
  async registration(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registration(registerDto);
  }
}
