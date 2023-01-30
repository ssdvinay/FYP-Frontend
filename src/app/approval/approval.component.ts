import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {Dealer} from "../dealer";
import {Util} from "../util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  approval: any;


  constructor(private apiService: RESTAPIService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getPendingDealerRequests().subscribe({
      next: (value: HttpResponse<Response<Dealer[]>>) => this.approval = value.body,
      error: err => Util.handleUnauthorized(err, this.router)
    })
  }

  updateDealerStatus(id: number, status: string) {
    this.apiService.updateDealerStatus(id, status).subscribe({
      next: (value: HttpResponse<Response<String>>) => {
        alert('Dealer is ' + status)
        this.ngOnInit();
      },
      error: err => Util.handleUnauthorized(err, this.router)
    })
  }
}
