import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from '../users/user.entity';
import authExceptions from './constants/exceptions';
import { GoogleUserDto } from './dto/google-user.dto';

const { Unauthorized } = authExceptions;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authGoogle(userDto: GoogleUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (user) {
      const { _id, email, username, profileImage } = user;
      const payload = { _id, email, username, profileImage };
      return this.generateToken(payload);
    }

    const newUser = await this.usersService.createGoogleUser(userDto);
    const { _id, email, username, profileImage } = newUser;
    const payload = { _id, email, username, profileImage };
    return this.generateToken(payload);
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    const { _id, email, username } = user;
    const payload = { _id, email, username };
    return this.generateToken(payload);
  }

  async registration(registerDto: RegisterUserDto) {
    const user = await this.usersService.createUser(registerDto);
    const { _id, email, username } = user;
    const payload = { _id, email, username };
    return this.generateToken(payload);
  }

  async generateToken(payload) {
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      user: payload,
    };
  }

  async checkAuth(user) {
    return await this.generateToken(user);
  }

  async validateUser(userDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException(Unauthorized);
    }

    const isPasswordCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException(Unauthorized);
    }

    return user;
  }
}
