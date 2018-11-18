import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

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
      .subscribe(res => {
        this.toastService.openSnackBar('User Created Successfully', '', 'success-snackbar');
        return res;
      }, error => { throw error; });
  }

  getUsers() {
    return this.http.get<User[]>(this.apiBaseURL + 'users/').pipe(map(res => {
      return res;
    }));
  }

  getUserByEmail(email) {
    return this.http.post(this.apiBaseURL + 'users/getByEmail', email, this.utility.requestHeaders()).pipe(map(res => {
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
