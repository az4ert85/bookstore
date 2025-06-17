import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof TokenExpiredError) {
          // Тут можна зробити логіку автооновлення токена
          // або редірект на /auth/refresh
        }
        return throwError(() => err);
      })
    );
  }
}
