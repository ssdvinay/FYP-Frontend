import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import {Observable} from "rxjs";
import {User} from "./user";
import {Response} from "./response";
import {Customer} from "./customer";
import {Dealer} from "./dealer";
import {Booking} from "./booking";

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {

  readonly baseApi = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  signup(user: User): Observable<any> {
    let url = this.baseApi + "/register"
    return this.http.post(url, user)
  }

  login(emailOrUsername: String, password: String): Observable<HttpResponse<any>> {
    let url = this.baseApi + "/login"
    let base64encodedData = btoa(emailOrUsername + ':' + password)
    return this.http.get<HttpResponse<any>>(url, this.getRequestOptions(base64encodedData))
  }

  getCustomerDetails(customerId: Number): Observable<HttpResponse<Response<Customer>>> {
    let url = this.baseApi + "/admin/customers/" + customerId
    return this.http.get<any>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getDealerDetails(dealerId: Number): Observable<HttpResponse<Response<Dealer>>> {
    let url = this.baseApi + "/admin/dealers/" + dealerId
    return this.http.get<any>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getAllDealers(): Observable<HttpResponse<Dealer[]>> {
    let url = this.baseApi + "/admin/dealers"
    return this.http.get<HttpResponse<Dealer[]>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getAllCustomers(): Observable<HttpResponse<Customer[]>> {
    let url = this.baseApi + "/admin/customers"
    return this.http.get<HttpResponse<Customer[]>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getRequestOptions(authorization: String | null): {} {
    const headers = {
      'Authorization': 'Basic ' + authorization,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE'
    }
    return {
      headers: new HttpHeaders(headers),
    }
  }

  getPendingDealerRequests(): Observable<HttpResponse<Response<Dealer[]>>> {
    let url = this.baseApi + "/admin/pending-requests"
    return this.http.get<HttpResponse<Response<Dealer[]>>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getBookings(): Observable<HttpResponse<Response<Array<Booking>>>> {
    let url = this.baseApi + "/admin/bookings"
    return this.http.get<HttpResponse<Response<Array<Booking>>>>(url, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  setBlacklisted(id: number, isBlacklisted: boolean): Observable<HttpResponse<Response<String>>> {
    let url = this.baseApi + "/admin/blacklist/" + id + "?isBlacklisted=" + isBlacklisted
    return this.http.put<HttpResponse<Response<String>>>(url, null, this.getRequestOptions(this.getAuthorizationHeader()))
  }

  getAuthorizationHeader()
    :
    String | null {
    let emailOrUsername: String | null = localStorage.getItem('emailOrUsername')
    if (emailOrUsername != null) {
      let password: String | null = localStorage.getItem('password')
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
    let url = this.baseApi + "/admin/update-status/" + dealerId + "?status=" + status
    return this.http.put<HttpResponse<Response<String>>>(url, null,
      this.getRequestOptions(this.getAuthorizationHeader()))
  }
}
