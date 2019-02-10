import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { Feedback } from '../models/feedback.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService, private router: Router) { }

  createFeedback(feedback: Feedback) {
    return this.http.post(this.apiBaseURL + 'feedbacks/create', feedback, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('Feedback registered Successfully', '', 'success-snackbar');
        this.router.navigate(['feedback']);
        return res;
      }, error => { throw error; });
  }

  getFeedbackById(feedbackId): any {
    return this.http.get(this.apiBaseURL + 'feedbacks/' + feedbackId).pipe(map(res => {
      return res;
    }));
  }

  getFeedbacks(): any {
    return this.http.get<Feedback[]>(this.apiBaseURL + 'feedbacks/').pipe(map(res => {
      return res;
    }));
  }

  updateFeedback(updatedFeedback: Feedback) {
    return this.http.put(this.apiBaseURL + 'feedbacks/' + updatedFeedback.id, updatedFeedback)
      .subscribe(res => {
        this.toastService.openSnackBar('Feedback Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
