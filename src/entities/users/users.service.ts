import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import {
  checkUserForDatabaseMatches,
  isIdValid,
} from 'src/entities/users/helpers/validation';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import exceptions from './constants/exceptions';

const { NotFound } = exceptions;
config();

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }

  async findById(userId: string): Promise<UserEntity> {
    isIdValid(userId);

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(NotFound);
    }
    return user;
  }

  async createUser(body: CreateUserDto | RegisterUserDto): Promise<UserEntity> {
    await checkUserForDatabaseMatches(
      body.username,
      body.email,
      this.userModel,
    );

    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.CRYPT_SALT),
    );

    const newUser = await new this.userModel({
      ...body,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async deleteUser(userId: string): Promise<UserEntity> {
    isIdValid(userId);
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(NotFound);
    }
    return deletedUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    isIdValid(userId);

    await checkUserForDatabaseMatches(
      updateUserDto.username,
      updateUserDto.email,
      this.userModel,
      userId,
    );

    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(NotFound);
    }
    return existingUser;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email });
  }
}
