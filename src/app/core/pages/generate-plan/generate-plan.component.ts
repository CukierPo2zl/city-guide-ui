import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlanService } from 'src/app/services/plan.service';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';

@Component({
  selector: 'app-generate-plan',
  templateUrl: './generate-plan.component.html',
  styleUrls: ['./generate-plan.component.scss']
})
export class GeneratePlanComponent implements OnInit {

  loaded = false;
  waypoints: google.maps.LatLngLiteral[] = [];
  start: Attraction;
  end: Attraction;
  collection: Attraction[];
  markers = [];
  center;
  points = '';
  constructor(
    private planService: PlanService,
    private attractionService: AttractionService
  ) { }

  ngOnInit(): void {

    this.planService.isGenerated.next(false);
    const response = history.state;
    this.start = response.start;
    this.end = response.end;
    this.collection = response.collection;

    this.center = {
      lat: this.start.latitude,
      lng: this.start.longitude,
    };

    this.formatCollection();
    this.planService.getRoute(this.points).subscribe((res) => {
      let response = res;
      let points = response.routes[0].legs[0].points;
      points.forEach((point) => {
        this.waypoints.push({
          lat: point.latitude,
          lng: point.longitude,
        });
      });
      this.loaded =true;
    });
    this.getMarkers();
  }

  getMarkers() {
    this.collection.forEach((instance) => {
      this.markers.push({
        position: {
          lat: instance.latitude,
          lng: instance.longitude,
        },
        label: {
          color: 'black',
          text: instance.name,
        },
        title: instance.name,
        options: {
          animation: google.maps.Animation.DROP,
        },
      });
    });
  }

  formatCollection() {
    this.promote(this.end);
    this.promote(this.start);

    this.collection.forEach((obj) => {
      this.points = this.points + obj.latitude + ',' + obj.longitude + ':';
    });
    this.points = this.points.slice(0, -1);

  }

  promote(foo) {
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].pk === foo.pk) {
        let a = this.collection.splice(i, 1);
        this.collection.unshift(a[0]);
        break;
      }
    }
  }

}
