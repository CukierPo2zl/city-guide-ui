import { Component, OnInit, Input } from '@angular/core';
import { Plan, PlanResponse } from 'src/app/models/plan';
import { Attraction, OrderedAttractionResponse } from 'src/app/models/attraction';
import { MatDialog } from '@angular/material/dialog';
import { PlanCardDialogComponent } from './plan-card-dialog/plan-card-dialog.component';

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent implements OnInit {

  @Input()
  instance: PlanResponse;
  routes: OrderedAttractionResponse[];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.routes = this.instance.route.slice(0, 3);
  }

  openDialog() {
    this.dialog.open(PlanCardDialogComponent, {
      width: '100%',
      data: {
        instance: this.instance
      },
    });
  }

}
