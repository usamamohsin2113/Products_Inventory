import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class InitInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request;

    if (this.authService.isAuthenticated())
      req = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authService.getToken()
        ),
      });

    this.loader.requestStarted();
    return this.handler(req, next);
  }
  handler(req: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) this.loader.requestEnded();
        },
        (error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.authService.logout();
            this.router.navigate(['auth/login']);
          } else if (error.status == 403){
            this.router.navigate(['error']);
          }

          console.log(error);
          this.loader.resetSpinner();
        } 
      )
    );
  }
}
