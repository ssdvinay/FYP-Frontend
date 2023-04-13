import {Component} from '@angular/core';
import {User} from "../../user";
import {UserHelper} from "../../user-helper";
import {RESTAPIService} from "../../apiservice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private apiService: RESTAPIService, private router: Router) {
  }

  signup() {
    let user: User | null = UserHelper.createUser(document, 'CUSTOMER')
    if (user == null) {
      alert('Password do not match')
      return
    }
    const formData = new FormData()
    formData.append('user', JSON.stringify(user))
    this.apiService.signupCustomer(formData).subscribe({
      next: value => {
        alert('Successfully signed up');
        this.router.navigate([''])
      },
      error: (err: HttpErrorResponse) => alert('Unable to signup: ' + err.error.error)
    })
  }
}
