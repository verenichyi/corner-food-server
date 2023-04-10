import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => {
            const { _id, email, username, profileImage } = user;
            return { _id, email, username, profileImage };
          });
        }

        const { _id, email, username, profileImage } = data;
        return { _id, email, username, profileImage };
      }),
    );
  }
}
