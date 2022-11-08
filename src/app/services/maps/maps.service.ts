import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  point = { lat: 0, lng: 0 };

  constructor() { }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      this.point = { lat, lng };
    });
  }
}
