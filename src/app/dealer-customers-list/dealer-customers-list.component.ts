import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DealerApiService} from "../dealer-api-service";
import {HttpResponse} from "@angular/common/http";
import {Role, Util} from "../util";
import {MyCustomerDto} from "../my-customer-dto";

@Component({
  selector: 'app-dealer-customers-list',
  templateUrl: './dealer-customers-list.component.html',
  styleUrls: ['./dealer-customers-list.component.css']
})
export class DealerCustomersListComponent implements OnInit {

  myCustomers: any

  constructor(
    private router: Router,
    private apiService: DealerApiService) {
  }

  ngOnInit(): void {
    this.apiService.getMyCustomers().subscribe({
      next: (value: HttpResponse<MyCustomerDto[]>) => {
        this.myCustomers = value
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Dealer),
    })
  }
}
