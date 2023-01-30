import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Dealer} from "../dealer";
import {Util} from "../util";

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent implements OnInit {

  dealers: any

  constructor(private apiService: RESTAPIService, private router: Router) {
  }

  ngOnInit(): void {
    this.getBlacklisted()
  }

  getBlacklisted() {
    this.apiService.getAllDealers().subscribe({
      next: (value: HttpResponse<Dealer[]>) => {
        this.dealers = value
      },
      error: err => Util.handleUnauthorized(err, this.router)
    })
  }

  setBlacklisted(id: number, isBlacklisted: boolean) {
    this.apiService.setBlacklisted(id, isBlacklisted).subscribe({
      next: value => {
        alert('Updates applied')
        this.ngOnInit()
      },
      error: err => {
        alert('Error occurred. Changes could not be applied')
        //Util.handleUnauthorized(err, this.router);
      }
    })
  }
}
