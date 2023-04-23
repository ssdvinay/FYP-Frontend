import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {CustomerApiService} from "../customer-api-service";
import {CustomerUpdateDto} from "../customer-update-dto";
import {AppStrings} from "../app-strings";
import {Response} from "../response";
import {Role, Util} from "../util";

@Component({
  selector: 'app-edit-customer-profile',
  templateUrl: './edit-customer-profile.component.html',
  styleUrls: ['./edit-customer-profile.component.css']
})
export class EditCustomerProfileComponent implements OnInit {

  user: any

  constructor(private apiService: CustomerApiService, private router: Router) {
  }


  ngOnInit(): void {
    if (localStorage.getItem(AppStrings.customerEmailOrUserName) == null) {
      alert('Your session is expired. Pleae log in.')
      this.router.navigate(['/customer/login'])
      return
    }

    this.apiService.getCustomerDetails().subscribe({
      next: (value: HttpResponse<Response<CustomerUpdateDto>>) => {
        this.user = value.body;
        return this.user;
      },
      error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
    });
  }

  update(event: Event) {
    event.preventDefault()
    let firstName = (document.getElementById('firstName') as HTMLInputElement).value
    let lastName = (document.getElementById('lastName') as HTMLInputElement).value
    let email = (document.getElementById('emailAddress') as HTMLInputElement).value
    let username = (document.getElementById('username') as HTMLInputElement).value
    let phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value
    let address = (document.getElementById('address') as HTMLInputElement).value
    let password = (document.getElementById('password') as HTMLInputElement).value
    let retypePassword = (document.getElementById('retypePassword') as HTMLInputElement).value
    let user = new CustomerUpdateDto(this.user.id, firstName, lastName, phoneNumber, email, username, address, password)
    if (password != retypePassword) {
      alert('Password do not match')
      return
    }
    if (user.firstName!.length == 0 && user.lastName!.length == 0) {
      alert('Please enter name')
      return
    }
    if (user.phoneNumber!.length == 0) {
      alert('Please provide phone number')
      return;
    }
    if (user.address!.length == 0) {
      alert('Please provide showroom address')
      return;
    }
    this.apiService.update(user).subscribe({
      next: value => {
        alert('Successfully update profile');
        if (password.length == 0) {
          this.router.navigate(['/customer/homepage'])
        } else {
          localStorage.removeItem(AppStrings.customerEmailOrUserName)
          localStorage.removeItem(AppStrings.customerPassword)
          alert('You changed password. Please login again!')
          this.router.navigate(['/customer/login'])
        }
      },
      error: (err: HttpErrorResponse) => alert('Unable to update profile: ' + err.error.error)
    })
  }
}
