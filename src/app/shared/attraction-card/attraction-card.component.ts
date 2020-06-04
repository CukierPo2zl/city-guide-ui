import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';
import { AttractionDetailComponent } from './attraction-detail/attraction-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss']
})
export class AttractionCardComponent implements OnInit {


  constructor(private attractionService: AttractionService, public dialog: MatDialog) { }
  @Input()
  instance: Attraction;
  @Input()
  isTrending: boolean;

  ngOnInit(): void { }

  addToCollection() {
    this.attractionService.addToCollection(this.instance);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AttractionDetailComponent, {
      width: '550px',
      minHeight: '450px',
      data: {
        instance: this.instance
      },
    });

  }
}
