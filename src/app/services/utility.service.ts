import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient) { }

  requestHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return httpOptions;
  }

  sendEmail(emailOptions) {
    return this.http.post(this.apiBaseURL + 'utility/email', emailOptions, this.requestHeaders())
      .subscribe(res => {
        return res;
      }, error => { throw error; });
  }

  forgotPassword(emailObject): any {
    return this.http.post(this.apiBaseURL + 'utility/forgotpassword', emailObject, this.requestHeaders()).pipe(map(res => {
      return res;
    }));
  }

  resetPassword(resetPassObject): any {
    return this.http.post(this.apiBaseURL + 'utility/resetpassword', resetPassObject, this.requestHeaders()).pipe(map(res => {
      return res;
    }));
  }
}
