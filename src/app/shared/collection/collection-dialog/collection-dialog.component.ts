import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';
import { CollectionMapDialogComponent } from '../collection-map-dialog/collection-map-dialog.component';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attractionService: AttractionService,
    public dialogRef: MatDialogRef<CollectionDialogComponent>,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void { }

  removeElement(element: Attraction) {
    this.attractionService.removeFromCollection(element);
  }

  submit(){
    this.dialogRef.close();
    this.dialog.open(CollectionMapDialogComponent,{
      width: '100%',
    });
  }

}
