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
import {CustomerComplaint} from "./customer-complaint";
import {DealerComplaints} from "./dealer-complaints";

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private static readonly customerBaseApi = RESTAPIService.baseApi + '/customer';

  constructor(private http: HttpClient) {
  }

  getAllComplaints(): Observable<HttpResponse<CustomerComplaint[]>> {
    let url = CustomerApiService.customerBaseApi + "/complaints"
    return this.http.get<HttpResponse<CustomerComplaint[]>>(url, this.getRequestOptions())
  }

  getComplaintsCount(): Observable<HttpResponse<DealerComplaints[]>> {
    let url = CustomerApiService.customerBaseApi + "/complaints/count"
    return this.http.get<HttpResponse<DealerComplaints[]>>(url, this.getRequestOptions())
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
