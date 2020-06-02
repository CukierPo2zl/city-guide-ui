import { Component, OnInit } from '@angular/core';
import { AttractionService } from 'src/app/services/attraction.service';
import { Attraction } from 'src/app/models/attraction';
import { MapMarker } from '@angular/google-maps';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-collection-map-dialog',
  templateUrl: './collection-map-dialog.component.html',
  styleUrls: ['./collection-map-dialog.component.scss']
})
export class CollectionMapDialogComponent implements OnInit {


  elements: Attraction[];
  markers = [];
  center;

  stateForm = new FormGroup({
    startPoint: new FormControl('', Validators.required),
    endPoint: new FormControl('', Validators.required),
  });
  constructor(
    private attractionService: AttractionService,
    private router: Router,
    public dialogRef: MatDialogRef<CollectionMapDialogComponent>,
    private planService: PlanService
  ) { }


  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.attractionService.myCollection.subscribe(
      (res) => {
        this.elements = res;
        this.elements.forEach((instance) => {
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
    );
  }

  placeChanged(event) {
    this.center = {
      lat: event.value.latitude,
      lng: event.value.longitude,
    };
  }

  onSubmit() {
    if (this.stateForm.valid && this.elements.length >= 2) {
      this.planService.isGenerated.next(true);
      this.dialogRef.close();
      this.router.navigate(['/app/plan'], {
        state: {
          start: this.stateForm.get('startPoint').value,
          end: this.stateForm.get('endPoint').value,
          collection: this.elements
        }
      });

    }

  }

}
