import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';
import { Attraction } from '../models/attraction';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  constructor(private http: HttpClient) { }
  loaded = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line: variable-name
  _attractions = new BehaviorSubject<Attraction[]>([]);
  dataStore: { attractions: Attraction[] } = { attractions: [] }
  readonly attractions = this._attractions.asObservable();


  loadTrendingAttractions() {
    this.getTrendingAttractions().subscribe((res: Attraction[]) => {
      this.dataStore.attractions = res;
      this._attractions.next(Object.assign({}, this.dataStore).attractions);
    },
      error => console.log('failed to fetch trending attractions'));
  }

  getAttractions(city: string, category: string) {
    if (city && category) {
      return this.getAttractionsByCityAndCategory(city, category);
    }
    if (city) {
      return this.getAttractionsByCity(city);
    }
    if (category) {
      return this.getAttractionsByCategory(category);
    }
  }
  private getAttractionsByCity(city: string) {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/?city=' + city);
  }
  private getAttractionsByCategory(category: string) {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/?category=' + category);
  }
  private getAttractionsByCityAndCategory(city: string, category: string) {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/?city=' + city + '&category=' + category);
  }

  private getTrendingAttractions() {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/trending');
  }

}
