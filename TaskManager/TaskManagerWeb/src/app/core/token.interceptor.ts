import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { catchError, finalize } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private loadingService: LoadingService
  ) {}
  headerConfig = {};

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.show();

    const token = this.auth.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned).pipe(
        catchError((error) => {
          throw error;
        }),
        finalize(() => {
          this.loadingService.hide();
        })
      );
    } else {
      this.headerConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Enabled': 'true',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        Authorization: '',
      };
      req.clone({ setHeaders: this.headerConfig });
      return next.handle(req).pipe(
        catchError((error) => {
          throw error;
        }),
        finalize(() => {
          this.loadingService.hide();
        })
      );
    }
  }
}
