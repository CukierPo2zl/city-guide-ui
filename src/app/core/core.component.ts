import { Component, OnInit } from '@angular/core';
import { Attraction } from '../models/attraction';
import { AttractionService } from '../services/attraction.service';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(
    private attractionService: AttractionService,
    private authService: AuthenticationService
  ) { }

  /** Loged in user */
  currentUser: User;
  /** Gets elements to display */
  attractions: Attraction[] = [];
  /** The property which sets 'popular' badge */
  isTrending: boolean;
  /** Attractions added to my collection  */
  elements: Attraction[] = [];
  /** Gets attractions from FilterComponent */
  attractionChange(event) {
    this.isTrending = false;
    this.attractions = event;

    /** Chech if attraction already is in the collection */
    this.attractions.forEach(instance => {
      if (this.elements.find(element => element.pk === instance.pk)) {
        instance.added = true;
      }
    });
  }
  /** Function that retrieves added to collection object */
  elementsChange(event) {
    this.elements.push(event);
  }
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  logOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
    /** Initially displays popular attractions */
    this.isTrending = true;
    this.attractionService.getTrendingAttractions().subscribe((res: Attraction[]) => {
      this.attractions = res;
    });
    this.authService.getCurrentUser().subscribe((res: User) => {
      this.currentUser = res;
    });
  }

}
