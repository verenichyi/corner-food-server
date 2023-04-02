import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
