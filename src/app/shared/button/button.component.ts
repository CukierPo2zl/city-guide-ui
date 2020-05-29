import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  styleUrls: ['./button.component.scss'],
  template: `
    <button [routerLink]="link" class='btn' [ngClass]="btnType" type="type">
      <ng-content>
      </ng-content>
    </button>
  `
})
export class ButtonComponent implements OnInit {

  text: string;
  @Input() btnType: string;

  @Input() link: string;

  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }

}
