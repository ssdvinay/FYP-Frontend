import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ShowroomFilters} from "./showroom-filters";
import {Observable} from "rxjs";
import {Showroom} from "./showroom";
import {RESTAPIService} from "./apiservice.service";
import {AppStrings} from "./app-strings";
import {Response} from "./response";
import {CustomerUpdateDto} from "./customer-update-dto";
import {Dealer} from "./dealer";
import {CarType} from "./car-type";
import {ProductType} from "./product-type";
import {Booking} from "./booking";
import {WorkHour} from "./work-hour";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private static readonly customerBaseApi = RESTAPIService.baseApi + '/customer';

  constructor(private http: HttpClient) {
  }

  getDealerBookingSlots(dealerId: number, date: String): Observable<HttpResponse<string[]>> {
    let url = CustomerApiService.customerBaseApi + "/" + dealerId + "/bookings?date=" + date
    return this.http.get<HttpResponse<string[]>>(url, this.getRequestOptions())
  }

  getDealerWorkHours(dealerId: number): Observable<HttpResponse<WorkHour[]>> {
    let url = CustomerApiService.customerBaseApi + "/dealers/" + dealerId + "/hours"
    return this.http.get<HttpResponse<WorkHour[]>>(url, this.getRequestOptions())
  }

  submitFeedback(bookingId: number, feedback: string): Observable<HttpResponse<Response<string>>> {
    let url = CustomerApiService.customerBaseApi + "/booking/feedback"
    let body = {
      bookingId: bookingId,
      feedback: feedback
    }
    return this.http.put<HttpResponse<Response<string>>>(url, body, this.getRequestOptions())
  }

  getCustomerBookings(): Observable<HttpResponse<Booking[]>> {
    let url = CustomerApiService.customerBaseApi + "/bookings"
    return this.http.get<HttpResponse<Booking[]>>(url, this.getRequestOptions())
  }

  saveBooking(booking: Booking): Observable<HttpResponse<Response<string>>> {
    let url = CustomerApiService.customerBaseApi + "/booking"
    return this.http.post<HttpResponse<Response<string>>>(url, booking, this.getRequestOptions())
  }

  getSupportedCarTypesByDealer(dealerId: number): Observable<HttpResponse<CarType[]>> {
    let url = CustomerApiService.customerBaseApi + "/dealers/" + dealerId + "/carTypes"
    return this.http.get<HttpResponse<CarType[]>>(url, this.getRequestOptions())
  }

  getSupportedProductTypesByDealer(dealerId: number): Observable<HttpResponse<ProductType[]>> {
    let url = CustomerApiService.customerBaseApi + "/dealers/" + dealerId + "/productTypes"
    return this.http.get<HttpResponse<ProductType[]>>(url, this.getRequestOptions())
  }

  getAllShowrooms(showroomFilters: ShowroomFilters): Observable<HttpResponse<Showroom[]>> {
    let url = CustomerApiService.customerBaseApi + "/showrooms"
    return this.http.put<HttpResponse<Showroom[]>>(url, showroomFilters, this.getRequestOptions())
  }

  getAllDealers(): Observable<HttpResponse<Dealer[]>> {
    let url = CustomerApiService.customerBaseApi + "/dealers"
    return this.http.get<HttpResponse<Dealer[]>>(url, this.getRequestOptions());
  }

  sendComplaint(dealerId: number, complaint: string): Observable<HttpResponse<Response<string>>> {
    let url = CustomerApiService.customerBaseApi + "/complain"
    let body = {
      id: dealerId,
      complaint: complaint
    }
    return this.http.put<HttpResponse<Response<string>>>(url, body, this.getRequestOptions())
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
