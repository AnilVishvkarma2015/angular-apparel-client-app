import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiBaseURL = AppConfig.settings.apiServer.baseURL;

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService, private router: Router) { }

  createUser(newUser: User) {
    return this.http.post(this.apiBaseURL + 'users/register', newUser, this.utility.requestHeaders())
      .subscribe(res => {
        this.toastService.openSnackBar('User Created Successfully', '', 'success-snackbar');
        this.router.navigate(['login']);
        return res;
      }, error => {
        this.toastService.openSnackBar('Email already registered', '', 'error-snackbar');
        this.router.navigate(['register']);
        throw error;
      });
  }

  getUsers() {
    return this.http.get<User[]>(this.apiBaseURL + 'users/').pipe(map(res => {
      return res;
    }));
  }

  getUserById(userId): any {
    return this.http.get(this.apiBaseURL + 'users/' + userId).pipe(map(res => {
      return res;
    }));
  }

  updateUser(updatedUser: User) {
    return this.http.put(this.apiBaseURL + 'users/' + updatedUser.id, updatedUser)
      .subscribe(res => {
        this.toastService.openSnackBar('User Updated Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  deleteUser(deleteUser: User) {
    return this.http.delete(this.apiBaseURL + 'users/' + deleteUser.id)
      .subscribe(res => {
        this.toastService.openSnackBar('User Deleted Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }
}
