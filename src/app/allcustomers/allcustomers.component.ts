import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Customer} from "../customer";
import {HttpResponse} from "@angular/common/http";
import {Util} from "../util";
import {Router} from "@angular/router";
import {round} from "@popperjs/core/lib/utils/math";

@Component({
  selector: 'app-allcustomers',
  templateUrl: './allcustomers.component.html',
  styleUrls: ['./allcustomers.component.css']
})
export class AllcustomersComponent implements OnInit {

  customers: any

  constructor(private apiService: RESTAPIService, private router: Router) {
  }

  getAllCustomers() {
    this.apiService.getAllCustomers().subscribe({
        next: (value: HttpResponse<Customer[]>) => {
          this.customers = value
        },
        error: err => Util.handleUnauthorized(err, this.router),
      }
    )
  }

  ngOnInit(): void {
    this.getAllCustomers()
  }
}
