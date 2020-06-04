import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MobileService } from '../services/mobile.service';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  mobile: boolean;
  stateForm = new FormGroup({
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password1: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  });
  hide = true;
  constructor(
    private mobileService: MobileService,
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
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
  onSubmit() {
    if (this.stateForm.valid) {
      return this.authService.register(
        this.stateForm.get('email').value,
        this.stateForm.get('username').value,
        this.stateForm.get('password1').value,
        this.stateForm.get('password2').value,
      ).subscribe((res) => {
        console.log(res);
        this.dialog.open(DialogConfirmComponent,{
          width: '500px',
          height:'500px'
        });
      }, error => console.log(error)

      );
    }

  }

}
