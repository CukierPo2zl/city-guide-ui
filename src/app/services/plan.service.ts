import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  isGenerated = new BehaviorSubject(false);
  apiUrl = 'https://api.tomtom.com/routing/1/calculateRoute/';

  constructor(private http: HttpClient) { }

  getRoute(points) {
     return this.http.get(this.apiUrl +
      points + '/json?key=' + environment.tomtom_api_key + '&traffic=false'
    );
    // return this.http.get(this.apiUrl +
    //   points + '/json?key=' + environment.tomtom_api_key + '&traffic=false'
    // );
  }
}
