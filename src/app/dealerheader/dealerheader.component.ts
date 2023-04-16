import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AppStrings} from "../app-strings";

@Component({
  selector: 'app-dealerheader',
  templateUrl: './dealerheader.component.html',
  styleUrls: ['./dealerheader.component.css']
})
export class DealerheaderComponent {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem(AppStrings.dealerEmailOrUserName)
    localStorage.removeItem(AppStrings.dealerPassword)
    alert('You have been logged out.')
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/dealer/homepage']));
  }

  ngOnInit(): void {
    let isLoginVisible: boolean = localStorage.getItem(AppStrings.dealerEmailOrUserName) == null
    // @ts-ignore
    document.getElementById('login').style.display = isLoginVisible ? "block" : "none"
    // @ts-ignore
    document.getElementById('signup').style.display = isLoginVisible ? "block" : "none"
    // @ts-ignore
    document.getElementById('logout').style.display = !isLoginVisible ? "block" : "none"
  }
}
