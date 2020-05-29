import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { shareReplay, map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.checkToken();
   }

  login(email: string, password: string) {
    return this.http.post(environment.url + 'api/users/auth/login/', { email, password })
      .pipe(map(res => {
        if (res) {
          this.setSession(res);
          this.authenticationState.next(true);
        }
      }));
  }

  logout() {
    localStorage.removeItem('session');
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  getToken() {
    return localStorage.getItem('session');
  }

  getCurrentUser() {
    return this.http.get<User>(environment.url + '/api/users/auth/user/');
  }

  checkToken() {
    const token = this.getToken();

    if (token) {
      this.authenticationState.next(true);
    } else {
      this.logout();
    }
  }

  private setSession(authResponse) {
    localStorage.setItem('session', authResponse.key);
    // TODO:
    // add expires
  }


}
