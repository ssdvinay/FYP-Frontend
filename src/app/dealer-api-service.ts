import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AppStrings} from "./app-strings";
import {Observable} from "rxjs";
import {Response} from "./response";
import {RESTAPIService} from "./apiservice.service";
import {Injectable} from "@angular/core";
import {UpdateDto} from "./update-dto";
import {Booking} from "./booking";
import {MyCustomerDto} from "./my-customer-dto";

@Injectable({
  providedIn: 'root'
})
export class DealerApiService {

  public static readonly dealerBaseApi = RESTAPIService.baseApi + "/dealer";

  constructor(private http: HttpClient) {
  }

  getAuthorizationHeader()
    :
    String | null {
    let emailOrUsername: String | null = localStorage.getItem(AppStrings.dealerEmailOrUserName)
    if (emailOrUsername != null) {
      let password: String | null = localStorage.getItem(AppStrings.dealerPassword)
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

  getMyCustomers(): Observable<HttpResponse<MyCustomerDto[]>> {
    let url = DealerApiService.dealerBaseApi + "/myCustomers"
    return this.http.get<HttpResponse<MyCustomerDto[]>>(url, this.getRequestOptions())
  }

  updateBookingStatus(bookingId: number, status: String): Observable<HttpResponse<Response<string>>> {
    let url = DealerApiService.dealerBaseApi + "/bookings/" + bookingId + "/update-status?status=" + status
    return this.http.put<HttpResponse<Response<string>>>(url, null, this.getRequestOptions())
  }

  getDealerBookings(): Observable<HttpResponse<Booking[]>> {
    let url = DealerApiService.dealerBaseApi + "/bookings"
    return this.http.get<HttpResponse<Booking[]>>(url, this.getRequestOptions())
  }

  getDealerDetails(): Observable<HttpResponse<Response<UpdateDto>>> {
    let url = DealerApiService.dealerBaseApi + "/" + localStorage.getItem(AppStrings.dealerEmailOrUserName)
    return this.http.get<any>(url, this.getRequestOptions())
  }

  update(formData: FormData): Observable<any> {
    let url = DealerApiService.dealerBaseApi + "/update"
    const headers = {
      'Authorization': 'Basic ' + this.getAuthorizationHeader(),
    }
    let option = {
      headers: new HttpHeaders(headers),
    }
    return this.http.put(url, formData, option)
  }
}
