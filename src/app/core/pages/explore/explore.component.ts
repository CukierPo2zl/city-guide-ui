import { Component, OnInit } from '@angular/core';
import { AttractionService } from 'src/app/services/attraction.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Attraction } from 'src/app/models/attraction';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  /** Gets elements to display */
  attractions: Attraction[];
  /** The property which sets 'popular' badge */
  isTrending: boolean;
  /** Attractions added to my collection  */
  // elements: Attraction[];

  constructor(
    private attractionService: AttractionService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    /** subscribe attraction array */
    this.attractionService.attractions.subscribe(res => this.attractions = res);

    /** Initially displays popular attractions */
    this.attractionService.loadTrendingAttractions();
    this.isTrending = true;
  }

  // /** Gets attractions from FilterComponent */
  attractionChange(event) {
    this.isTrending = false;
  }

}
