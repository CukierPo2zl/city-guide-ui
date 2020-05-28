import { Component, OnInit, Input } from '@angular/core';
import { CollectionDialogComponent } from './collection-dialog/collection-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Attraction } from 'src/app/models/attraction';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input()
  elements: Attraction[];

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CollectionDialogComponent, {
      width: '550px',
      minHeight: '450px',
      data: {
        elements: this.elements
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addElement(event){
    this.elements.push(event);
  }
}
