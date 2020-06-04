import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanResponse } from 'src/app/models/plan';
import { PlanService } from 'src/app/services/plan.service';
import { Response, Leg } from 'src/app/models/route_response';
import { Attraction } from 'src/app/models/attraction';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-plan-card-dialog',
  templateUrl: './plan-card-dialog.component.html',
  styleUrls: ['./plan-card-dialog.component.scss']
})
export class PlanCardDialogComponent implements OnInit {

  waypoints = '';
  center;
  markers = [];
  dataSource: Attraction[] = [];
  legs: Leg[];
  options;
  displayedColumns: string[] = ['lp', 'name', 'city', 'category'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    console.log(this.data.instance.route);
    let index = 0;
    this.data.instance.route.forEach((instance) => {
      index += 1;
      instance.attraction.position = index;
      this.dataSource.push(instance.attraction);
    });
    this.options = {
      strokeColor: '#033cac',
      strokeOpacity: 0.9,
      strokeWeight: 8
    };
    this.center = {
      lat: this.data.instance.route[0].attraction.latitude,
      lng: this.data.instance.route[0].attraction.longitude,
    };

    this.getMarkers();
    this.formatCollection();

    this.planService.getRoute(this.waypoints).subscribe((res: Response) => {
      this.legs = res.routes[0].legs;

      this.legs.forEach((leg) => {
        leg.points.forEach((point) => {
          point.lat = point.latitude;
          point.lng = point.longitude;
        });
      });
    });
  }

  formatCollection() {
    this.data.instance.route.forEach((obj) => {
      this.waypoints += obj.attraction.latitude + ',' + obj.attraction.longitude + ':';
    });
    this.waypoints = this.waypoints.slice(0, -1);
  }

  getMarkers() {
    this.data.instance.route.forEach((instance) => {
      this.markers.push({
        position: {
          lat: instance.attraction.latitude,
          lng: instance.attraction.longitude,
        },
        label: {
          color: 'black',
          text: instance.attraction.name,
        },
        title: instance.attraction.name,
        options: {
          animation: google.maps.Animation.DROP,
        },
      });
    });
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

}
