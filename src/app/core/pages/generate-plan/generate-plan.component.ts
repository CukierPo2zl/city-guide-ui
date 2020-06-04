import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PlanService } from 'src/app/services/plan.service';
import { Attraction, OrderedAttraction } from 'src/app/models/attraction';
import { AttractionService } from 'src/app/services/attraction.service';
import { Leg, Response } from 'src/app/models/route_response';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-generate-plan',
  templateUrl: './generate-plan.component.html',
  styleUrls: ['./generate-plan.component.scss'],

})
export class GeneratePlanComponent implements OnInit {

  dataSource: Attraction[] = [];
  displayedColumns: string[] = ['lp', 'name', 'city', 'category'];
  expandedElement: Attraction | null;
  loaded = false;
  index = 0;
  options;
  waypoints: google.maps.LatLngLiteral[] = [];
  start: Attraction;
  end: Attraction;
  collection: Attraction[];
  legs: Leg[];
  length: number;
  saved = false;
  markers = [];
  center;
  points = '';

  constructor(
    private planService: PlanService,
    private attractionService: AttractionService
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
      this.length = res.routes[0].summary.lengthInMeters;
      this.legs = res.routes[0].legs;
      this.legs.forEach((leg) => {
        leg.points.forEach((point) => {
          point.lat = point.latitude;
          point.lng = point.longitude;
        });
        const arr = this.collection;
        const startPoint = leg.points[0];
        const nextPoint = this.getClosest(startPoint, arr);
        this.index += 1;
        nextPoint.position = this.index;
        nextPoint.routeLength = leg.summary.lengthInMeters;
        nextPoint.travelTime = leg.summary.travelTimeInSeconds;
        this.dataSource.push(nextPoint);
      });
      this.end.position = this.collection.length;
      this.end.travelTime = null;
      this.end.routeLength = null;
      this.dataSource.push(this.end);
      this.loaded = true;
    });
    this.getMarkers();
    this.attractionService.clearCollection();
  }

  getClosest(goal, array): Attraction {
    return array.reduce((prev: Attraction, curr: Attraction) => {
      const tmp = (((Math.abs(curr.latitude - goal.lat) < Math.abs(prev.latitude - goal.lat)) &&
        (Math.abs(curr.longitude - goal.lng) < Math.abs(prev.longitude - goal.lng))) ? curr : prev);
      if (this.dataSource.find(el => el.pk === tmp.pk)) {
        array.forEach((c, i) => {
          if (c.pk === tmp.pk) {
            array.splice(i, 1);
          }
        });
        return this.getClosest(goal, array);
      }
      return tmp;
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
        const a = this.collection.splice(i, 1);
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

  captureScreen() {
    const data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('myplan.pdf');
    });
  }

  savePlan() {
    const routes = this.dataSource.map(
      (element) => {
        return ({
          attraction: element.pk,
          order: element.position,
          travel_time: element.travelTime,
          travel_length: element.routeLength,
        });
      });
    this.planService.postPlan(routes, this.length)
      .subscribe((res) => {
        console.log(res);
        this.saved = true;
      });
  }


}


