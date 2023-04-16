import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import {Observable} from "rxjs";
import {Response} from "./response";
import {Customer} from "./customer";
import {Dealer} from "./dealer";
import {Booking} from "./booking";
import {AppStrings} from "./app-strings";

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {

  public static readonly baseApi = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  signupCustomer(formData: FormData): Observable<any> {
    let url = RESTAPIService.baseApi + "/register-customer"
    return this.http.post(url, formData)
  }

  signup(formData: FormData): Observable<any> {
    let url = RESTAPIService.baseApi + "/register"
    return this.http.post(url, formData)
  }

  login(emailOrUsername: String, password: String): Observable<HttpResponse<any>> {
    let url = RESTAPIService.baseApi + "/login"
    let base64encodedData = btoa(emailOrUsername + ':' + password)
    return this.http.get<HttpResponse<any>>(url, this.getRequestOptions(base64encodedData))
  }

  getCustomerDetails(customerId: Number): Observable<HttpResponse<Response<Customer>>> {
    let url = RESTAPIService.baseApi + "/admin/customers/" + customerId
    return this.http.get<any>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getDealerDetails(dealerId: Number): Observable<HttpResponse<Response<Dealer>>> {
    let url = RESTAPIService.baseApi + "/admin/dealers/" + dealerId
    return this.http.get<any>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getAllDealers(): Observable<HttpResponse<Dealer[]>> {
    let url = RESTAPIService.baseApi + "/admin/dealers"
    return this.http.get<HttpResponse<Dealer[]>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getAllCustomers(): Observable<HttpResponse<Customer[]>> {
    let url = RESTAPIService.baseApi + "/admin/customers"
    return this.http.get<HttpResponse<Customer[]>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getRequestOptions(authorization: String | null): {} {
    const headers = {
      'Authorization': 'Basic ' + authorization,
      'Content-Type': 'application/json',
    }
    return {
      headers: new HttpHeaders(headers),
    }
  }

  getPendingDealerRequests(): Observable<HttpResponse<Response<Dealer[]>>> {
    let url = RESTAPIService.baseApi + "/admin/pending-requests"
    return this.http.get<HttpResponse<Response<Dealer[]>>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getBookings(): Observable<HttpResponse<Response<Array<Booking>>>> {
    let url = RESTAPIService.baseApi + "/admin/bookings"
    return this.http.get<HttpResponse<Response<Array<Booking>>>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  setBlacklisted(id: number, isBlacklisted: boolean): Observable<HttpResponse<Response<String>>> {
    let url = RESTAPIService.baseApi + "/admin/blacklist/" + id + "?isBlacklisted=" + isBlacklisted
    return this.http.put<HttpResponse<Response<String>>>(url, null, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getAuthorizationHeader()
    :
    String | null {
    let emailOrUsername: String | null = localStorage.getItem(AppStrings.emailOrUserName)
    if (emailOrUsername != null) {
      let password: String | null = localStorage.getItem(AppStrings.password)
      return btoa(emailOrUsername + ':' + password)
    }
    return null
  }

  updateDealerStatus(dealerId
                       :
                       number, status
                       :
                       string
  ):
    Observable<HttpResponse<Response<String>>> {
    let url = RESTAPIService.baseApi + "/admin/update-status/" + dealerId + "?status=" + status
    return this.http.put<HttpResponse<Response<String>>>(url, null,
      this.getRequestOptions(this.getAuthorizationHeader()))
  }
}
