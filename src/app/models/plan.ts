import { OrderedAttraction } from './attraction';

export interface Plan {
  route: OrderedAttraction[];
  route_length: number;
}
