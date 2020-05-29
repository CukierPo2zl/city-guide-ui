import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attraction } from 'src/app/models/attraction';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private collectionService: CollectionService
  ) { }


  ngOnInit(): void {}

  removeElement(element: Attraction){
    element.added = false;
    this.collectionService.removeFromCollection(element);
  }

}
