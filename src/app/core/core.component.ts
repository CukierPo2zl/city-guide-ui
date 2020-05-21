import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor() { }
  cards: string[] = ["1", "2", "3", "4", "5"];
  ngOnInit(): void {
  }

}
