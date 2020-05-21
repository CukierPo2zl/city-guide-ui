import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  styleUrls: ['./button.component.scss'],
  template: `
    <button [routerLink]="link" class='btn' [ngClass]="type">
      <ng-content>
      </ng-content>
    </button>
  `
})
export class ButtonComponent implements OnInit {

  text: string;
  @Input() type: string;
  @Input() link: string;

  constructor() { }

  ngOnInit(): void {
  }

}
