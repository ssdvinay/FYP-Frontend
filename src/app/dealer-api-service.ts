import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AppStrings} from "./app-strings";
import {Observable} from "rxjs";
import {Response} from "./response";
import {Dealer} from "./dealer";
import {RESTAPIService} from "./apiservice.service";
import {Injectable} from "@angular/core";
import {User} from "./user";
import {UpdateDto} from "./update-dto";

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

  getDealerDetails(): Observable<HttpResponse<Response<UpdateDto>>> {
    let url = DealerApiService.dealerBaseApi + "/" + localStorage.getItem(AppStrings.dealerEmailOrUserName)
    return this.http.get<any>(url, this.getRequestOptions())
  }

  update(formData: FormData): Observable<any> {
    let url = DealerApiService.dealerBaseApi + "/update"
    const headers = {
      'Authorization': 'Basic ' + this.getAuthorizationHeader(),
    }
    let option =  {
      headers: new HttpHeaders(headers),
    }
    return this.http.put(url, formData, option)
  }
}
