import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppStrings} from "../app-strings";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  logout() {
    localStorage.removeItem(AppStrings.emailOrUserName)
    localStorage.removeItem(AppStrings.password)
    alert('You have been logged out.')
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/admin/homepage']));
  }

  ngOnInit(): void {
    let isLoginVisible: boolean = localStorage.getItem(AppStrings.emailOrUserName) == null
    // @ts-ignore
    document.getElementById('login').style.display = isLoginVisible ? "block" : "none"
    // @ts-ignore
    document.getElementById('logout').style.display = !isLoginVisible ? "block" : "none"
  }
}
