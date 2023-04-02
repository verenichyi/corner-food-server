import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import authExceptions from '../entities/auth/constants/exceptions';

const { Unauthorized } = authExceptions;

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(Unauthorized);
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const { _id, email, username } = user;
      req.user = { _id, email, username };

      return true;
    } catch (error) {
      throw new UnauthorizedException(Unauthorized);
    }
  }
}
