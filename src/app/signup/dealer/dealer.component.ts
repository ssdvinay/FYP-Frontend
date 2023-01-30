import {Component} from '@angular/core';
import {UserHelper} from "../../user-helper";
import {RESTAPIService} from "../../apiservice.service";
import {User} from "../../user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent {

  constructor(private apiService: RESTAPIService) {
  }

  signup() {
    let user: User | null = UserHelper.createUser(document, 'DEALER')
    if (user == null) {
      alert('Password do not match')
      return
    }
    let sct: number[] = []
    if ((document.getElementById('sedan') as HTMLInputElement).checked)
      sct.push(2)
    if ((document.getElementById('suv') as HTMLInputElement).checked)
      sct.push(3)
    if ((document.getElementById('hatchback') as HTMLInputElement).checked)
      sct.push(1)
    user.supportedCarTypes = sct

    let spt: number[] = []
    if ((document.getElementById('tng') as HTMLInputElement).checked)
      spt.push(1)
    if ((document.getElementById('ut') as HTMLInputElement).checked)
      spt.push(3)
    if ((document.getElementById('matte') as HTMLInputElement).checked)
      spt.push(2)
    user.supportedProductTypes = spt

    user.price = (document.getElementById('price') as HTMLInputElement).valueAsNumber

    this.apiService.signup(user).subscribe({
      next: value => alert('Successfully signed up'),
      error: (err: HttpErrorResponse) => alert('Unable to signup: ' + err.error.error)
    })
  }
}
