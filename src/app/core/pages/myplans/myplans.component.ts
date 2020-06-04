import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-myplans',
  templateUrl: './myplans.component.html',
  styleUrls: ['./myplans.component.scss']
})
export class MyPlansComponent implements OnInit {

  constructor(private planService: PlanService) { }

  plan: Plan[];

  ngOnInit(): void {
    this.planService.getMyPlans().subscribe(
      (res: Plan[]) => {
        this.plan = res;
      }
    )
  }

}
