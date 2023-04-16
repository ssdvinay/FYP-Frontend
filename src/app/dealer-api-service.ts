import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppStrings} from "./app-strings";

export class DealerApiService {

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
}
