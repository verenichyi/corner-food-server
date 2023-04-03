import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/google')
  async loginWithGoogle(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const {
      email,
      name: username,
      picture: profileImage,
    } = ticket.getPayload();
    return await this.authService.authGoogle({ email, username, profileImage });
  }

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

  @HttpCode(StatusCodes.CREATED)
  @Post('/registration')
  async registration(@Body() registerDto: RegisterUserDto) {
    return await this.authService.registration(registerDto);
  }
}
