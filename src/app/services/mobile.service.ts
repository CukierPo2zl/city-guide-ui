import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MobileService {
  private isMobile = new Subject();

  constructor(public breakpointObserver: BreakpointObserver) {
    this.checkWidth();
  }

  onMobileChange(status: boolean) {
    this.isMobile.next(status);
  }

  getMobileStatus(): Observable<any> {
    return this.isMobile.asObservable();
  }

  public checkWidth() {
    this.breakpointObserver
      .observe(['(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.onMobileChange(true);
        } else {
          this.onMobileChange(false);
        }
      });
  }

}
