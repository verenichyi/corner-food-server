import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as dotenv from 'dotenv';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './entities/auth/auth.module';
import { FoodTypeModule } from './entities/food-type/food-type.module';
import { FoodModule } from './entities/food/food.module';
import { FilesModule } from './entities/files/files.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join('..', '.env'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    UsersModule,
    AuthModule,
    FoodTypeModule,
    FoodModule,
    FilesModule
  ],
})
export class AppModule {}
