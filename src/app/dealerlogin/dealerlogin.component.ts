import { Component } from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {AppStrings} from "../app-strings";

@Component({
  selector: 'app-dealerlogin',
  templateUrl: './dealerlogin.component.html',
  styleUrls: ['./dealerlogin.component.css']
})
export class DealerloginComponent {


  constructor(private apiService: RESTAPIService, private router: Router) {

  }

  login() {
    let emailOrUsername = (document.getElementById('login') as HTMLInputElement).value
    let password = (document.getElementById('password') as HTMLInputElement).value
    this.apiService.login(emailOrUsername, password).subscribe({
      next: (value: HttpResponse<Response<String>>) => {
        localStorage.setItem(AppStrings.dealerEmailOrUserName, emailOrUsername)
        localStorage.setItem(AppStrings.dealerPassword, password)
        alert('You are signed in')
        this.router.navigate(['/dealer/homepage'])
      },
      error: err => alert('Unable to login'),
    })
  }
}
