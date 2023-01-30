import { Component } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";
import {RESTAPIService} from "../apiservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  constructor(private apiService: RESTAPIService, private router: Router) {

  }

  login() {
    let emailOrUsername = (document.getElementById('login') as HTMLInputElement).value
    let password = (document.getElementById('password') as HTMLInputElement).value
    this.apiService.login(emailOrUsername, password).subscribe({
      next: (value: HttpResponse<Response<String>>) => {
        localStorage.setItem('emailOrUsername', emailOrUsername)
        localStorage.setItem('password', password)
        alert('You are signed in')
        this.router.navigate(['/admin'])
      },
      error: err => alert('Unable to login'),
    })
  }
}
