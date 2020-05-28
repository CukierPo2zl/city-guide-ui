import { Component, OnInit } from '@angular/core';
import { Attraction } from '../models/attraction';
import { AttractionService } from '../services/attraction.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private attractionService: AttractionService) { }
  attractions: Attraction[] = [];
  isTrending: boolean;
  elements = [];
  attractionChange(event) {
    this.isTrending = false;
    this.attractions = event;
  }
  elementsChange(event) {
    this.elements.push(event);
  }
  ngOnInit(): void {
    this.isTrending = true;
    this.attractionService.getTrendingAttractions().subscribe((res: Attraction[]) => {
      this.attractions = res;
    });
  }

}
