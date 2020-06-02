export interface Response {
  formatVersion: string;
  routes: [{
    legs: Leg[],
    summary: Summary
  }];
}

export class Leg {
  constructor(
    public points: { lat: number, lng: number, latitude: number, longitude: number}[] ,
    public summary: Summary
  ) { }
}

export interface Summary {
  lengthInMeters: number;
  travelTimeInSeconds: number;
}

