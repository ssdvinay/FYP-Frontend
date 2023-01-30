import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

export class Util {


  static handleUnauthorized(err: HttpErrorResponse, router: Router) {
    if (err.status == 401) {
      alert('Your session is expired. Pleae log in.')
      router.navigate(['/admin/login'])
    }
  }
}
