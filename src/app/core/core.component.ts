import { Component, OnInit } from '@angular/core';
import { Attraction } from '../models/attraction';
import { AttractionService } from '../services/attraction.service';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(
    private attractionService: AttractionService,
    private authService: AuthenticationService,
  ) { }

  /** Loged in user */
  currentUser: User;

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  logOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.getCurrentUserData();
    }
  }

  getCurrentUserData() {
    this.authService.getCurrentUser().subscribe((res: User) => {
      this.currentUser = res;
      //TODO:
      // display as async
    });
  }

}
