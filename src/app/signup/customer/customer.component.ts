import {Component} from '@angular/core';
import {User} from "../../user";
import {UserHelper} from "../../user-helper";
import {RESTAPIService} from "../../apiservice.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private apiService: RESTAPIService) {
  }

  signup() {
    let user: User | null = UserHelper.createUser(document, 'CUSTOMER')
    if (user == null) {
      alert('Password do not match')
      return
    }
    this.apiService.signup(user).subscribe({
      next: value => alert('Successfully signed up'),
      error: (err: HttpErrorResponse) => alert('Unable to signup' + err.error.body)
    })
  }
}
