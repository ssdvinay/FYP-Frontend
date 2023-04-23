import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ShowroomFilters} from "./showroom-filters";
import {Observable} from "rxjs";
import {Showroom} from "./showroom";
import {RESTAPIService} from "./apiservice.service";
import {AppStrings} from "./app-strings";
import {Response} from "./response";
import {CustomerUpdateDto} from "./customer-update-dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private static readonly customerBaseApi = RESTAPIService.baseApi + '/customer';

  constructor(private http: HttpClient) {
  }

  getAllShowrooms(showroomFilters: ShowroomFilters): Observable<HttpResponse<Showroom[]>> {
    let url = CustomerApiService.customerBaseApi + "/showrooms"
    return this.http.put<HttpResponse<Showroom[]>>(url, showroomFilters, this.getRequestOptions())
  }

  getCustomerDetails(): Observable<HttpResponse<Response<CustomerUpdateDto>>> {
    let url = CustomerApiService.customerBaseApi + "/" + localStorage.getItem(AppStrings.customerEmailOrUserName)
    return this.http.get<any>(url, this.getRequestOptions())
  }

  update(user: CustomerUpdateDto): Observable<any> {
    const headers = {
      'Authorization': 'Basic ' + this.getAuthorizationHeader(),
    }
    let option = {
      headers: new HttpHeaders(headers),
    }
    let url = CustomerApiService.customerBaseApi + "/update"
    return this.http.put(url, user, option)
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
