import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppStrings} from "../app-strings";

@Component({
  selector: 'app-customerheader',
  templateUrl: './customerheader.component.html',
  styleUrls: ['./customerheader.component.css']
})
export class CustomerheaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem(AppStrings.customerEmailOrUserName)
    localStorage.removeItem(AppStrings.customerPassword)
    alert('You have been logged out.')
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/customer/homepage']));
  }

  ngOnInit(): void {
    let isLoginVisible: boolean = localStorage.getItem(AppStrings.customerEmailOrUserName) == null
    // @ts-ignore
    document.getElementById('login').style.display = isLoginVisible ? "block" : "none"
    // @ts-ignore
    document.getElementById('signup').style.display = isLoginVisible ? "block" : "none"
    // @ts-ignore
    document.getElementById('logout').style.display = !isLoginVisible ? "block" : "none"
  }
}
