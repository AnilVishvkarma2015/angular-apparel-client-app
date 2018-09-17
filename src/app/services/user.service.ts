import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createUser(newUser: User) {
    return this.http.post(this.utility.requestUrl() + 'users/register', newUser, this.utility.requestHeaders())
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
    return this.http.get<User[]>(this.utility.requestUrl() + 'users/');
  }

  updateUser(updatedUser: User) {
    return this.http.put(this.utility.requestUrl() + 'users/' + updatedUser.id, updatedUser)
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
    return this.http.delete(this.utility.requestUrl() + 'users/' + deleteUser.id)
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
