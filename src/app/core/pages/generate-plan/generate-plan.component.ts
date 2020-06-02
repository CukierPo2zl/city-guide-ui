import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlanService } from 'src/app/services/plan.service';
import { Attraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';
import { Leg, Response } from 'src/app/models/route_response';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';


@Component({
  selector: 'app-generate-plan',
  templateUrl: './generate-plan.component.html',
  styleUrls: ['./generate-plan.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GeneratePlanComponent implements OnInit {

  dataSource: Attraction[] = [];
  displayedColumns: string[] = ['lp', 'name'];
  expandedElement: Attraction | null;
  loaded = false;
  index = 0;
  options;
  waypoints: google.maps.LatLngLiteral[] = [];
  start: Attraction;

  end: Attraction;
  collection: Attraction[];
  legs: Leg[];
  markers = [];
  center;
  points = '';
  constructor(
    private planService: PlanService,
  ) { }

  ngOnInit(): void {
    this.options = {
      strokeColor: '#033cac',
      strokeOpacity: 0.9,
      strokeWeight: 8
    };

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
    this.planService.getRoute(this.points).subscribe((res: Response) => {
      this.legs = res.routes[0].legs;


      this.legs.forEach((leg) => {
        leg.points.forEach((point) => {
          point.lat = point.latitude;
          point.lng = point.longitude;
          this.collection.forEach((el) => {
            if (el.latitude.toString().startsWith(point.lat.toString().slice(0, 5)) &&
              el.longitude.toString().startsWith(point.lng.toString().slice(0, 5))
            ) {
              this.dataSource.push(el);
            }
          });
        });
      });
      this.removeDuplicates();

      this.loaded = true;
    });
    this.getMarkers();
  }




  /**
   * stupid but works
   */
  removeDuplicates() {
    this.dataSource = Array.from(new Set(this.dataSource.map(a => a.pk)))
      .map(pk => {
        const instance = this.dataSource.find(a => a.pk === pk);
        this.index += 1;
        instance.position = this.index;
        return instance;
      });
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
    // this.promote(this.end);
    this.promote(this.start, 1);
    this.promote(this.end, 0);
    this.collection.forEach((obj) => {
      this.points += obj.latitude + ',' + obj.longitude + ':';
    });
    this.points = this.points.slice(0, -1);

  }

  promote(foo, lvl: number) {
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].pk === foo.pk) {
        let a = this.collection.splice(i, 1);
        if (lvl === 1) {
          this.collection.unshift(a[0]);
        }
        if (lvl === 0) {
          this.collection.push(a[0]);
        }
        break;
      }
    }
  }


}


