import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerApiService} from "../customer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../booking";
import {Role, Util} from "../util";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DealerDetailsModalComponent} from "../dealer-details-modal/dealer-details-modal.component";
import {Response} from "../response";

@Component({
  selector: 'app-customer-bookings-list',
  templateUrl: './customer-bookings-list.component.html',
  styleUrls: ['./customer-bookings-list.component.css']
})
export class CustomerBookingsListComponent implements OnInit {
  bookings: any

  selectedBooking: Booking | null = null;

  feedbackText: string = '';

  rating: number = 0;

  constructor(
    private router: Router,
    private apiService: CustomerApiService,
    private modalService: NgbModal) {
  }

  setRating(ratingValue: number) {
    this.rating = ratingValue;
  }

  openDealerDetailsModal(booking: Booking) {
    this.selectedBooking = booking;
    const modalRef = this.modalService.open(DealerDetailsModalComponent);
    modalRef.componentInstance.dealer = booking.dealer;
  }

  openFeedbackModal(booking: any) {
    this.selectedBooking = booking;
    this.feedbackText = booking.feedback || '';
    this.rating = booking.rating
  }

  submitFeedback() {
    if (this.feedbackText.length == 0) {
      alert("Please write feedback")
      return
    }

    if (this.rating == 0) {
      alert("Please select rating")
      return;
    }

    this.apiService.submitFeedback(this.selectedBooking?.id!, this.feedbackText,this.rating).subscribe({
      next: (value: HttpResponse<Response<string>>) => {
        alert("Successfully submitted feedback")
        this.ngOnInit()
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }

  closeFeedbackModal() {
    this.feedbackText = '';
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
