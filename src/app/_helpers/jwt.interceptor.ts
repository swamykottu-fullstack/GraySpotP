import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthenticationService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header if jwt token is available
    let currentUser = this.authservice.getCurrentUser;
    if(currentUser != null) {
      if(currentUser && currentUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error}`;
          } else {
              // server-side error
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.error.message}`;
              this.showToatMessage(error.error.message)
          }
          return throwError(errorMessage);
      })
  );
  }

  showToatMessage(message: string) {
    //alert(message)
  }
}
