import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MobileService } from '../services/mobile.service';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  mobile: boolean;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  hide = true;
  constructor(
    private mobileService: MobileService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      router.navigate(['/app']);
    }
  }

  ngOnInit(): void {
    this.mobileService.getMobileStatus().subscribe(mobile => {
      this.mobile = mobile;
    });
    this.onResize();
  }

  onResize() {
    this.mobileService.checkWidth();
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }


}
