import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createUser(newUser: User) {
    return this.http.post(this.apiBaseURL + 'users/register', newUser, this.utility.requestHeaders())
      .subscribe(
        data => {
          this.toastService.openSnackBar('User Created Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('User Cannot Created', '', 'error-snackbar');
        });
  }

  getUsers() {
    return this.http.get<User[]>(this.apiBaseURL + 'users/');
  }

  updateUser(updatedUser: User) {
    return this.http.put(this.apiBaseURL + 'users/' + updatedUser.id, updatedUser)
      .subscribe(
        data => {
          this.toastService.openSnackBar('User Updated Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('User Cannot Updated', '', 'error-snackbar');
        });
  }

  deleteUser(deleteUser: User) {
    return this.http.delete(this.apiBaseURL + 'users/' + deleteUser.id)
      .subscribe(
        data => {
          this.toastService.openSnackBar('User Deleted Successfully', '', 'success-snackbar');
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('User Cannot Deleted', '', 'error-snackbar');
        });
  }
}
