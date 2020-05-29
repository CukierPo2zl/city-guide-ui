import { Injectable } from '@angular/core';
import { Attraction } from '../models/attraction';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collection: Attraction[] = [];
  collectionChenged = new BehaviorSubject(false);

  constructor() { }

  addToCollection(element) {
    this.collection.push(element);
  }

  removeFromCollection(element) {
    const index = this.collection.indexOf(element);
    if (index !== -1) {
      this.collection.splice(index, 1);
    }
    this.collectionChenged.next(true);
  }

  getCollection() {
    return this.collection;
  }


}
