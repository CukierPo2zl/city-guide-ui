import { OrderedAttraction, OrderedAttractionResponse } from './attraction';

export interface Plan {
  route: OrderedAttraction[];
  route_length: number;
}

export interface PlanResponse {
  route: OrderedAttractionResponse[];
  route_length: number;
}
