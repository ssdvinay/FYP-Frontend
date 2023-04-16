import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";


export class Util {


  static handleUnauthorized(err: HttpErrorResponse, router: Router, role: Role = Role.Admin) {
    if (err.status == 401) {
      alert('Your session is expired. Pleae log in.')
      switch (role) {
        case Role.Admin:
          router.navigate(['/admin/login'])
          break;
        case Role.Customer:
          router.navigate(['/customer/login'])
          break;
        case Role.Dealer:
          router.navigate(['/dealer/login'])
          break;
      }
    }
  }
}

export enum Role {
  Admin, Customer, Dealer
}
