import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Dealer} from "../dealer";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {Util} from "../util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alldealers',
  templateUrl: './alldealers.component.html',
  styleUrls: ['./alldealers.component.css']
})
export class AlldealersComponent implements OnInit{

  dealers: any

  constructor(private apiService: RESTAPIService, private router: Router) {
  }

  getAllDealers() {
    this.apiService.getAllDealers().subscribe({
        next: (value: HttpResponse<Dealer[]>) => {
          this.dealers = value
        },
        error: err =>Util.handleUnauthorized(err, this.router),
      }
    )
  }

  ngOnInit(): void {
    this.getAllDealers()
  }
}
