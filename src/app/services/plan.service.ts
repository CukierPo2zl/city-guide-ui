import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  /**
   * Current plan generation status
   */
  isGenerated = new BehaviorSubject(false);

  /**
   * extra params:
   * - maxAlternatives
   * - instructionsType
   * - computeBestOrder
   * - routeRepresentation
   * - computeTravelTimeFor
   * - routeType
   * - avoid
   * - travelMode
   */
  apiUrl = 'https://api.tomtom.com/routing/1/calculateRoute/';
  test = 'https://api.tomtom.com/routing/1/calculateRoute/54.34854635,18.653228046143376:52.215062399999994,21.03556319303125:50.061693,19.937321:53.120484399999995,23.165792953941907/json?key=EnAp6eACiEfJFG8Fu691Bb2UAOL8MXqX';
  test2 = 'https://api.tomtom.com/routing/1/calculateRoute/52.215062399999994,21.03556319303125:54.34854635,18.653228046143376:50.061693,19.937321:53.120484399999995,23.165792953941907/json?computeBestOrder=true&key=EnAp6eACiEfJFG8Fu691Bb2UAOL8MXqX';
  constructor(private http: HttpClient) { }
  /**
   *
   * @param points
   * @returns polylines in best order.
   * Single polyline includes list of points
   * @example
   * points = "1:2:3"
   * output = {
   *  Polyline(1,3),
   *  Polyline(3,2)
   * }
   *
   */
  getRoute(points) {
    return this.http.get(this.apiUrl +
      points + '/json?computeBestOrder=true&travelMode=pedestrian&routeType=shortest&key=' + environment.tomtom_api_key);
  }
}
