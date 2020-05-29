import { Injectable } from '@angular/core';


import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';
/**
 * Authentication guard implements CanActive.
 * Service is responsible for determining whether the user is authenticated or not.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    ) { }

  /**
   *
   * @param route route
   * @param state state
   * @returns true if user is authenticated or redirects to state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   return this.auth.isAuthenticated();
  }
}
