import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MobileService } from '../services/mobile.service';

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
  ) {

  }

  ngOnInit(): void {
    this.mobileService.getMobileStatus().subscribe(mobile=>{
      this.mobile = mobile;
    });
    this.onResize()
  }

  onResize(){
    this.mobileService.checkWidth();
    }


}
