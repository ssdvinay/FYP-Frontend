import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DealerApiService} from "../dealer-api-service";
import {HttpResponse} from "@angular/common/http";
import {CustomerComplaint} from "../customer-complaint";
import {Role, Util} from "../util";

@Component({
  selector: 'app-dealer-complains',
  templateUrl: './dealer-complains.component.html',
  styleUrls: ['./dealer-complains.component.css']
})
export class DealerComplainsComponent implements OnInit {

  allComplaints: any

  constructor(private apiService: DealerApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.apiService.getAllComplaints().subscribe({
      next: (value: HttpResponse<CustomerComplaint[]>) => {
        this.allComplaints = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    })
  }

}
