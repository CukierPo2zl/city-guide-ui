import { Injectable } from '@angular/core';


import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { PlanService } from './plan.service';
/**
 * Generate plan guard implements CanActive.
 */
@Injectable({
  providedIn: 'root'
})
export class PlanGuardService implements CanActivate {

  constructor(
    private planSevice: PlanService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.planSevice.isGenerated.value === false) {
      this.router.navigate(['/app']);
      return false;
    }
    return this.planSevice.isGenerated.value;
  }
}
