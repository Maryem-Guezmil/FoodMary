import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getCurrentLocation(): Observable<LatLngLiteral> {
    //whenever ther is a change in new Observable, the observer method inform the observ object of the new .. 
    return new Observable((observer) => {
      //check if browser suppports it
      if(!navigator.geolocation) return;

      return navigator.geolocation.getCurrentPosition(
        (pos)=>{
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          )
        },
        (err)=>{
          observer.error(err)
        }
      )

    });
  }
}
