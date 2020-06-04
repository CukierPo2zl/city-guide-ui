import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-explore',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']

})
export class ProfileComponent implements OnInit {

  users: User[];

  currentUser: User;
  changingImage: boolean;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,

  ) {}
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.getCurrentUserData();
    }
}

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  getCurrentUserData() {
    this.authService.getCurrentUser().subscribe((res: User) => {
      this.currentUser = res;
});
  }

}
