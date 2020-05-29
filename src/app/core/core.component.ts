import { Component, OnInit } from '@angular/core';
import { Attraction } from '../models/attraction';
import { AttractionService } from '../services/attraction.service';
import { AuthenticationService } from '../services/auth.service';
import { User } from '../models/user';
import { CollectionService } from '../services/collection.service';
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
    private collectionService: CollectionService
  ) { }

  /** Loged in user */
  currentUser: User;

  /** Gets elements to display */
  attractions: Attraction[];

  /** The property which sets 'popular' badge */
  isTrending: boolean;

  /** Attractions added to my collection  */
  elements: Attraction[];

  /** Gets attractions from FilterComponent */
  attractionChange(event) {
    this.isTrending = false;
    // this.attractions = event;
    this.remarkFABs();
  }


  remarkFABs() {
    /** Chech if attraction already is in the collection */
    this.attractions.forEach(instance => {
      console.log(instance);
      if (this.elements.find(element => element.pk === instance.pk)) {
        instance.added = true;
      }
    });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }
  logOut() {
    this.authService.logout();
  }
  ngOnInit(): void {
    /** subscribe attraction array */
    this.attractionService.attractions.subscribe( res => this.attractions = res);

    /** Initially displays popular attractions */
    this.attractionService.loadTrendingAttractions();
    this.isTrending = true;

    if (this.authService.isAuthenticated()) {
      this.getCurrentUserData();
    }
    this.elements = this.collectionService.getCollection();

  }

  getCurrentUserData() {
    this.authService.getCurrentUser().subscribe((res: User) => {
      this.currentUser = res;
    });
  }

}
