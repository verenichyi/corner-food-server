import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { checkUserForDatabaseMatches } from 'src/entities/users/utils/validation';
import { validateId } from '../../utils/validateId';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { GoogleUserDto } from '../auth/dto/google-user.dto';
import { GoogleUserEntity } from './google-user.entity';
import { StripeService } from '../stripe/stripe.service';

config();

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private stripeService: StripeService,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userModel.find().lean();
  }

  async findById(userId: string): Promise<UserEntity> {
    validateId(userId);

    const user = await this.userModel.findById(userId).lean();
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createGoogleUser(body: GoogleUserDto): Promise<GoogleUserEntity> {
    await checkUserForDatabaseMatches(body.email, this.userModel);

    const stripeCustomer = await this.stripeService.createCustomer(
      body.username,
      body.email,
    );

    const newUser = await new this.userModel({
      ...body,
      stripeCustomerId: stripeCustomer.id,
    });
    return newUser.save();
  }

  async createUser(body: CreateUserDto | RegisterUserDto): Promise<UserEntity> {
    await checkUserForDatabaseMatches(body.email, this.userModel);

    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(process.env.CRYPT_SALT),
    );

    const stripeCustomer = await this.stripeService.createCustomer(
      body.username,
      body.email,
    );

    const newUser = await new this.userModel({
      ...body,
      password: hashedPassword,
      stripeCustomerId: stripeCustomer.id,
    });
    return newUser.save();
  }

  async deleteUser(userId: string): Promise<UserEntity> {
    validateId(userId);

    const deletedUser = await this.userModel.findByIdAndDelete(userId).lean();
    if (!deletedUser) {
      throw new NotFoundException();
    }

    return deletedUser;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    validateId(id);
    await checkUserForDatabaseMatches(updateUserDto.email, this.userModel, id);

    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
      })
      .lean();
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userModel.findOne({ email }).lean();
  }
}
