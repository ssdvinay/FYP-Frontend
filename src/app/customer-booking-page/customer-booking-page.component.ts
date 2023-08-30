import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
import {WorkHour} from "../work-hour";
import {Location} from "@angular/common";

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
  selectedSlot: string | undefined;
  availableSlots: { [key: string]: string[] } = {}
  workHours: any
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
              private location: Location,
              private apiService: CustomerApiService,
              private el: ElementRef,
              private renderer: Renderer2) {
    this.showroom = shoowroomSharedService.showRoom
    if (this.showroom == null)
      this.location.back()
    Util.getCurrentLocation((lat: number, long: number) => {
      this.currentLocation.latitude = lat
      this.currentLocation.longitude = long
    })
    this.availableSlots[""] = []
  }

  scrollToBottom(): void {
    const element = this.el.nativeElement.querySelector('app-review-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
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

    this.apiService.getDealerWorkHours(this.showroom.dealer.id).subscribe({
      next: (value: HttpResponse<WorkHour[]>) => {
        this.workHours = value
        this.updateAvailableSlots()
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }

  updateAvailableSlots(day: string = "", bookedHours: string[] = []) {
    this.workHours.forEach((wh: WorkHour) => {
      this.availableSlots[wh.day] = this.split(wh.workFrom, wh.workTo, day == wh.day ? bookedHours : [])
    })
  }

  split(workFrom: string, workTo: string, bookedHours: string[]): string[] {
    let result: string[] = []
    let startTime: number = +workFrom.split(":")[0]
    let endTime: number = +workTo.split(":")[0]
    for (let hour = startTime; hour <= endTime; hour++) {
      const slot = `${hour}:00`;
      if (!bookedHours.includes(slot))
        result.push(slot)
    }
    return result
  }

  formatHour(hour: number): string {
    if (hour <= 9) return `0${hour}`
    return `${hour}`
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

  onBookingDateChange() {
    this.selectedSlot = undefined
    this.apiService.getDealerBookingSlots(this.showroom.dealer.id, this.selectedDate?.toString()!!).subscribe({
      next: (value: any) => {
        let day: string = Util.getDayAsString(this.selectedDate!!)
        this.updateAvailableSlots(day, value)
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }

  getSelectedDay(): string {
    return !this.selectedDate ? "" : Util.getDayAsString(this.selectedDate)
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

    if (!this.selectedSlot) {
      alert("Please select a time slot")
      return;
    }

    let booking = new Booking(0,
      0,
      this.showroom.price,
      "PENDING",
      this.selectedDate.toString(),
      this.selectedSlot,
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
