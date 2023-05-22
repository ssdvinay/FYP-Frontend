import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DealerApiService} from "../dealer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../booking";
import {Role, Util} from "../util";
import {Response} from "../response";

@Component({
  selector: 'app-dealer-bookings-list',
  templateUrl: './dealer-bookings-list.component.html',
  styleUrls: ['./dealer-bookings-list.component.css']
})
export class DealerBookingsListComponent implements OnInit {

  bookings: any

  constructor(
    private router: Router,
    private apiService: DealerApiService) {
  }

  ngOnInit(): void {
    this.apiService.getDealerBookings().subscribe({
      next: (value: HttpResponse<Booking[]>) => {
        this.bookings = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Dealer),
    })
  }

  confirmBooking(booking: Booking) {
    this.apiService.updateBookingStatus(booking.id, "CONFIRMED").subscribe({
      next: (value: HttpResponse<Response<string>>) => {
        alert(value.body)
        this.ngOnInit()
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Dealer),
    })
  }

  rejectBooking(booking: Booking) {
    this.apiService.updateBookingStatus(booking.id, "CANCELLED").subscribe({
      next: (value: HttpResponse<Response<string>>) => {
        alert(value.body)
        this.ngOnInit()
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Dealer),
    })
  }

  getBookingStatusClass(status: string) {
    if (status === 'CONFIRMED') {
      return 'text-success';
    } else if (status === 'CANCELLED') {
      return 'text-danger';
    } else if (status === 'PENDING') {
      return 'text-orange'
    } else {
      return '';
    }
  }
}
