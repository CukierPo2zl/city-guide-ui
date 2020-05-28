import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';
import { Attraction } from '../models/attraction';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  constructor(private http: HttpClient) { }

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
  getAttractionsByCity(city: string) {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/?city=' + city);
  }
  getAttractionsByCategory(category: string) {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/?category=' + category);
  }
  getAttractionsByCityAndCategory(city: string, category: string) {
    return this.http.get<Attraction[]>(environment.url + 'api/attraction/?city=' + city + '&category=' + category);
  }

  getTrendingAttractions(){
    return this.http.get<Attraction[]>(environment.url+'api/attraction/trending');
  }

}
