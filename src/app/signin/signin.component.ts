import {Component} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Response} from "../response";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {

  constructor(private apiService: RESTAPIService, private router: Router) {

  }

  login() {
    let emailOrUsername = (document.getElementById('login') as HTMLInputElement).value
    let password = (document.getElementById('password') as HTMLInputElement).value
    this.apiService.login(emailOrUsername, password).subscribe({
      next: (value: HttpResponse<Response<String>>) => {
        alert('Login successful')
        this.router.navigate([''])
      },
      error: err => alert('Unable to login'),
    })
  }
}
