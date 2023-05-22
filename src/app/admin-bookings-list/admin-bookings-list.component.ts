import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DealerApiService} from "../dealer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../booking";
import {Role, Util} from "../util";
import {RESTAPIService} from "../apiservice.service";

@Component({
  selector: 'app-admin-bookings-list',
  templateUrl: './admin-bookings-list.component.html',
  styleUrls: ['./admin-bookings-list.component.css']
})
export class AdminBookingsListComponent implements OnInit{

  bookings: any

  constructor(
    private router: Router,
    private apiService: RESTAPIService) {
  }

  ngOnInit(): void {
    this.apiService.getAllBookings().subscribe({
      next: (value: HttpResponse<Booking[]>) => {
        this.bookings = value
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
