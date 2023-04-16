import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ShowroomFilters} from "./showroom-filters";
import {Observable} from "rxjs";
import {Showroom} from "./showroom";
import {RESTAPIService} from "./apiservice.service";
import {AppStrings} from "./app-strings";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) {
  }

  getAllShowrooms(showroomFilters: ShowroomFilters): Observable<HttpResponse<Showroom[]>> {
    let url = RESTAPIService.baseApi + "/customer/showrooms"
    return this.http.put<HttpResponse<Showroom[]>>(url, showroomFilters, this.getRequestOptions())
  }

  getAuthorizationHeader()
    :
    String | null {
    let emailOrUsername: String | null = localStorage.getItem(AppStrings.customerEmailOrUserName)
    if (emailOrUsername != null) {
      let password: String | null = localStorage.getItem(AppStrings.customerPassword)
      return btoa(emailOrUsername + ':' + password)
    }
    return null
  }

  getRequestOptions(): {} {
    const headers = {
      'Authorization': 'Basic ' + this.getAuthorizationHeader(),
      'Content-Type': 'application/json',
    }
    return {
      headers: new HttpHeaders(headers),
    }
  }
}
