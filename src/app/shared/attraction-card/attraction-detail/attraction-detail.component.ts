import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';



@Component({
  selector: 'app-detail-card',
  templateUrl: './attraction-detail.component.html',
  styleUrls: ['./attraction-detail.component.scss']
})
export class AttractionDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attractionService: AttractionService
  ) { }

  ngOnInit(): void {  }
  }



