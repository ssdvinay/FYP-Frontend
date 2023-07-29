import {Component, OnInit} from '@angular/core';
import {ShowroomSharedService} from "../showroom-shared-service";
import {Router} from "@angular/router";
import {CustomerApiService} from "../customer-api-service";
import {Showroom} from "../showroom";
import {HttpResponse} from "@angular/common/http";
import {Role, Util} from "../util";
import {CarType} from "../car-type";
import {ProductType} from "../product-type";
import {Booking} from "../booking";
import {DealerAssociationId} from "../dealer-association-id";
import {Response} from "../response";

@Component({
  selector: 'app-customer-booking-page',
  templateUrl: './customer-booking-page.component.html',
  styleUrls: ['./customer-booking-page.component.css']
})
export class CustomerBookingPageComponent implements OnInit {

  showroom: Showroom

  supportedCarTypes: any

  supportedProductTypes: any

  selectedCarType: CarType | undefined;
  selectedProductType: ProductType | undefined;
  selectedDate: Date | undefined;
  currentLocation = {
    latitude: 0,
    longitude: 0
  }

  currentLocationUpdate(latitude: number, longitude: number) {
    this.currentLocation.latitude = latitude
    this.currentLocation.longitude = longitude
  }

  constructor(private shoowroomSharedService: ShowroomSharedService,
              private router: Router,
              private apiService: CustomerApiService) {
    this.showroom = shoowroomSharedService.showRoom
    Util.getCurrentLocation((lat: number, long: number) => {
      this.currentLocation.latitude = lat
      this.currentLocation.longitude = long
    })
  }

  ngOnInit(): void {
    this.apiService.getSupportedCarTypesByDealer(this.showroom.dealer.id).subscribe({
      next: (value: HttpResponse<CarType[]>) => {
        this.supportedCarTypes = value
        this.selectedCarType = this.supportedCarTypes[0]
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })

    this.apiService.getSupportedProductTypesByDealer(this.showroom.dealer.id).subscribe({
      next: (value: HttpResponse<ProductType[]>) => {
        this.supportedProductTypes = value
        this.selectedProductType = this.supportedProductTypes[0]
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }

  openGoogleMaps() {
    Util.openGoogleMaps(this.showroom.dealer.latitude, this.showroom.dealer.longitude)
  }

  getDistance(): number {
    return +Util.getDistanceFromLatLonInKm(
      this.currentLocation.latitude,
      this.currentLocation.longitude,
      this.showroom.dealer.latitude,
      this.showroom.dealer.longitude
    ).toFixed(2)
  }

  createBooking() {
    if (!this.selectedCarType || !this.selectedProductType || !this.selectedDate) {
      // Display an error or show a message indicating that all fields need to be filled
      alert("Please select a car type, a product type, and a date.");
      return;
    }

    // Validate the selected date
    const currentDate = new Date();
    if (this.selectedDate < currentDate) {
      // Display an error or show a message indicating that the date is not valid
      console.log("Please select a current or future date.");
      return;
    }

    let booking = new Booking(0,
      0,
      this.showroom.price,
      "PENDING",
      this.selectedDate.toString(),
      currentDate.toDateString(),
      new DealerAssociationId(
        this.showroom.dealer.id,
        this.selectedCarType.id,
        this.selectedProductType.id,
        this.selectedCarType,
        this.selectedProductType
      ))
    this.apiService.saveBooking(booking).subscribe({
      next: (value: HttpResponse<Response<string>>) => {
        alert(value.body)
        this.router.navigate(['/customer/homepage'])
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }
}
