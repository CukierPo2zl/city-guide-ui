import { City } from './city';
import { Category } from './category';

export interface Attraction {
  pk: number;
  name: string;
  picture: string;
  description: string;
  rate: number;
  city: City;
  category: Category;
  added: boolean;
  latitude: number;
  longitude: number;
  position: number;
}
