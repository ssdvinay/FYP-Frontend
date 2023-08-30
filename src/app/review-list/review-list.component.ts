import {Component, Input, OnInit} from '@angular/core';
import {CustomerApiService} from "../customer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../booking";
import {Role, Util} from "../util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  @Input() dealerId: number = 0

  bookings: any

  constructor(private router: Router,
              private apiService: CustomerApiService) {
  }

  ngOnInit(): void {
    this.apiService.getDealerBookings(this.dealerId).subscribe({
      next: (value: HttpResponse<Booking[]>) => {
        this.bookings = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Dealer),
    })
  }
}
