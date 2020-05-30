import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CollectionDialogComponent } from './collection-dialog/collection-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private attractionService: AttractionService
    ) { }


  elements: Attraction[];

  ngOnInit(): void {
    this.attractionService.myCollection.subscribe(res => this.elements = res);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CollectionDialogComponent, {
      width: '550px',
      minHeight: '450px',
      data: {
        elements: this.elements
      }
    });

  }


}
