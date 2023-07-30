import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


// Constants for Pakistan's latitude and longitude boundaries
const PAKISTAN_LAT_MIN = 23.6345;
const PAKISTAN_LAT_MAX = 37.0841;
const PAKISTAN_LNG_MIN = 60.8724;
const PAKISTAN_LNG_MAX = 77.8405;

type CurrentLocationCallback = (latitude: number, longitude: number) => void

export class Util {

  static degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers
    const dLat = Util.degreesToRadians(lat2 - lat1);
    const dLon = Util.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(Util.degreesToRadians(lat1)) * Math.cos(Util.degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }


  static isInPakistan(latitude: number, longitude: number): boolean {
    return (latitude >= PAKISTAN_LAT_MIN && latitude <= PAKISTAN_LAT_MAX)
      && (longitude >= PAKISTAN_LNG_MIN && longitude <= PAKISTAN_LNG_MAX);
  }

  static getDayAsString(date: Date) {
    const d = new Date(date)
    return d.toLocaleDateString("en-PK", {
      weekday: "long"
    })
  }

  static getCurrentLocation(callback: CurrentLocationCallback) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not available in this browser.');
    }
  }

  static openGoogleMaps(latitude: number, longitude: number) {
    // Construct the Google Maps URL with the latitude and longitude parameters
    const mapsURL = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Open the Google Maps URL in a new tab
    window.open(mapsURL, '_blank');
  }

  static handleUnauthorized(err: HttpErrorResponse, router: Router, role: Role = Role.Admin) {
    if (err.status == 401) {
      alert('Your session is expired. Pleae log in.')
      switch (role) {
        case Role.Admin:
          router.navigate(['/admin/login'])
          break;
        case Role.Customer:
          router.navigate(['/customer/login'])
          break;
        case Role.Dealer:
          router.navigate(['/dealer/login'])
          break;
      }
    }
  }
}

export enum Role {
  Admin, Customer, Dealer
}
