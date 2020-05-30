import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  onClick(link: string): void {
    if (!this.isLoggedIn()) {
      this.dialog.open(AuthDialogComponent, {
        width: '250px',
      });
    } else {
      this.router.navigate([link]);
    }
  }

}
