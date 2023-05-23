import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerApiService} from "../customer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../booking";
import {Role, Util} from "../util";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DealerDetailsModalComponent} from "../dealer-details-modal/dealer-details-modal.component";

@Component({
  selector: 'app-customer-bookings-list',
  templateUrl: './customer-bookings-list.component.html',
  styleUrls: ['./customer-bookings-list.component.css']
})
export class CustomerBookingsListComponent implements OnInit {
  bookings: any

  selectedBooking: Booking | null = null;

  constructor(
    private router: Router,
    private apiService: CustomerApiService,
    private modalService: NgbModal) {
  }

  openDealerDetailsModal(booking: Booking) {
    this.selectedBooking = booking;
    const modalRef = this.modalService.open(DealerDetailsModalComponent);
    modalRef.componentInstance.dealer = booking.dealer;
  }

  ngOnInit(): void {
    this.apiService.getCustomerBookings().subscribe({
      next: (value: HttpResponse<Booking[]>) => {
        this.bookings = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
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
