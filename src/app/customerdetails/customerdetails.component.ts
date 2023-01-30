import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Customer} from "../customer";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {ActivatedRoute, Router} from "@angular/router";
import {Util} from "../util";

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

  customer: any

  constructor(private apiService: RESTAPIService, private route: ActivatedRoute, private router: Router) {
  }

  getCustomerDetails(customerId: Number) {
    this.apiService.getCustomerDetails(customerId).subscribe({
        next: (value: HttpResponse<Response<Customer>>) => this.customer = value.body,
        error: err => Util.handleUnauthorized(err, this.router),
      }
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.getCustomerDetails(value['id'])
    })
  }
}
