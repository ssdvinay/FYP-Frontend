import {Component, OnInit} from '@angular/core';
import {CustomerApiService} from "../customer-api-service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Role, Util} from "../util";
import {Dealer} from "../dealer";
import {Response} from "../response";

@Component({
  selector: 'app-customer-complaint',
  templateUrl: './customer-complaint.component.html',
  styleUrls: ['./customer-complaint.component.css']
})
export class CustomerComplaintComponent implements OnInit {
  dealers: any;

  filteredDealers: Dealer[]
  searchQuery = '';
  isComplaintModalOpen = false;
  selectedDealer: any;
  complaint = '';

  constructor(private apiService: CustomerApiService, private router: Router) {
    this.filteredDealers = this.dealers
  }

  ngOnInit(): void {
    this.apiService.getAllDealers().subscribe({
      next: (value: HttpResponse<Dealer[]>) => {
        this.dealers = value
        this.filteredDealers = this.dealers
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }

  searchDealers() {
    this.filteredDealers = this.dealers.filter((dealer: Dealer) => {
        let dealerName = dealer.user.firstName + " " + dealer.user.lastName;
        return dealerName.toLowerCase().includes(this.searchQuery.toLowerCase());
      }
    );
  }

  openComplaintModal(dealer: Dealer) {
    this.selectedDealer = dealer;
    this.complaint = ''
  }

  closeComplaintModal() {
    this.complaint = '';
  }

  sendComplaint() {
    this.apiService.sendComplaint(this.selectedDealer.id, this.complaint).subscribe({
      next: (value: HttpResponse<Response<string>>) => {
        alert("Complaint lodged successfully!")
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }
}
