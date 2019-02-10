import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UtilityService } from './utility.service';
import { Report } from '../models/report.model';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private utility: UtilityService) { }

  createReport(newReport: Report) {
    return this.http.post(this.apiBaseURL + 'reports/create', newReport, this.utility.requestHeaders())
      .subscribe(res => {
        return res;
      }, error => { throw error; });
  }
}
