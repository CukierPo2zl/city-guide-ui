import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attraction } from 'src/app/models/attraction';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss']
})
export class AttractionCardComponent implements OnInit {


  constructor() { }
  @Input()
  instance: Attraction;
  @Input()
  isTrending: boolean;
  @Output()
  elementsChange: EventEmitter<Attraction> = new EventEmitter<Attraction>();

  ngOnInit(): void {}

  addToCollection() {
    this.instance.added = true;
    this.elementsChange.emit(this.instance);
  }

}
