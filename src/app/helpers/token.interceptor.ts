import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with token if user is authenticated
    const request_url = request.url.startsWith('https://api.');
    if (this.authenticationService.isAuthenticated() && !request_url) {

      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `token ${this.authenticationService.getToken()}`,

        }
      });
    }

    return next.handle(request);
  }
}
