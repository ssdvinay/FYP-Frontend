import {Component, OnInit} from '@angular/core';
import {CustomerApiService} from "../customer-api-service";
import {Router} from "@angular/router";
import {CustomerComplaint} from "../customer-complaint";
import {Role, Util} from "../util";
import {HttpResponse} from "@angular/common/http";
import {DealerComplaints} from "../dealer-complaints";

@Component({
  selector: 'app-complaints-page',
  templateUrl: './complaints-page.component.html',
  styleUrls: ['./complaints-page.component.css']
})
export class ComplaintsPageComponent implements OnInit {

  constructor(private apiService: CustomerApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.apiService.getAllComplaints().subscribe({
      next: (value: HttpResponse<CustomerComplaint[]>) => {
        this.allComplaints = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
    this.apiService.getComplaintsCount().subscribe({
      next: (value: HttpResponse<DealerComplaints[]>) => {
        this.dealerComplaints = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }


  activeTab = 'all-complaints'; // Set the initial active tab

  allComplaints : any

  dealerComplaints: any

  changeTab(tab: string) {
    this.activeTab = tab;
  }
}
