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

  attractionsSource = new BehaviorSubject<Attraction[]>([]);
  myCollectionSource = new BehaviorSubject<Attraction[]>([]);

  attractionsDataStore: { attractions: Attraction[] } = { attractions: [] };
  collectionDataStore: { myCollection: Attraction[] } = { myCollection: [] };

  readonly attractions = this.attractionsSource.asObservable();
  readonly myCollection = this.myCollectionSource.asObservable();


  addToCollection(instance: Attraction) {
    this.collectionDataStore.myCollection.push(instance);
    // Push a new copy of our collection list to all Subscribers.
    this.myCollectionSource.next(Object.assign({}, this.collectionDataStore).myCollection);

    this.attractionsDataStore.attractions.forEach((obj) => {
      if (instance.pk === obj.pk) {
        obj.added = true;
      }
    });
  }

  removeFromCollection(instance: Attraction) {
    this.collectionDataStore.myCollection.forEach((c, i) => {
      if (c.pk === instance.pk) {
        this.collectionDataStore.myCollection.splice(i, 1);
      }
    });
    this.myCollectionSource.next(Object.assign({}, this.collectionDataStore).myCollection);

    this.attractionsDataStore.attractions.forEach((obj) => {
      if (instance.pk === obj.pk) {
        obj.added = false;
      }
    });
  }


  loadAttractions(city: string, category: string) {

    this.getAttractions(city, category).subscribe(
      (res: Attraction[]) => {
        res.forEach((obj) => {
          if (this.collectionDataStore.myCollection.find(element => element.pk === obj.pk)) {
            obj.added = true;
          }
        });
        this.attractionsDataStore.attractions = res;
        this.attractionsSource.next(Object.assign({}, this.attractionsDataStore).attractions);
      },
      error => console.log('failed to fetch attractions'));

  }
  loadTrendingAttractions() {
    this.getTrendingAttractions().subscribe((res: Attraction[]) => {
      this.attractionsDataStore.attractions = res;
      // Push a new copy of our attraction list to all Subscribers.
      this.attractionsSource.next(Object.assign({}, this.attractionsDataStore).attractions);
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
