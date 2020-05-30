import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss']
})
export class AttractionCardComponent implements OnInit {


  constructor(private attractionService: AttractionService) { }
  @Input()
  instance: Attraction;
  @Input()
  isTrending: boolean;

  ngOnInit(): void {}

  addToCollection() {
    // this.instance.added = true;
    this.attractionService.addToCollection(this.instance);
  }

}
