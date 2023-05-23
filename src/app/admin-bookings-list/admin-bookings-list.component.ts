import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../booking";
import {Role, Util} from "../util";
import {RESTAPIService} from "../apiservice.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DealerDetailsModalComponent} from "../dealer-details-modal/dealer-details-modal.component";
import {CustomerDetailsModalComponent} from "../customer-details-modal/customer-details-modal.component";

@Component({
  selector: 'app-admin-bookings-list',
  templateUrl: './admin-bookings-list.component.html',
  styleUrls: ['./admin-bookings-list.component.css']
})
export class AdminBookingsListComponent implements OnInit {

  bookings: any

  selectedBooking: Booking | null = null;

  constructor(
    private router: Router,
    private apiService: RESTAPIService,
    private modalService: NgbModal) {
  }

  openDealerDetailsModal(booking: Booking) {
    this.selectedBooking = booking;
    const modalRef = this.modalService.open(DealerDetailsModalComponent);
    modalRef.componentInstance.dealer = booking.dealer;
  }

  openCustomerDetailsModal(booking: Booking) {
    this.selectedBooking = booking;
    const modalRef = this.modalService.open(CustomerDetailsModalComponent);
    modalRef.componentInstance.customer = booking.customer;
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
