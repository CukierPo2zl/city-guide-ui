import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attraction } from 'src/app/models/attraction';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss']
})
export class AttractionCardComponent implements OnInit {


  constructor(private collectionService: CollectionService) { }
  @Input()
  instance: Attraction;
  @Input()
  isTrending: boolean;

  ngOnInit(): void {}

  addToCollection() {
    this.instance.added = true;
    this.collectionService.addToCollection(this.instance);
  }

}
