import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
import { User } from '../models/user.model';
const baseURL = 'http://localhost:4000/users/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  createUser(user: User) {
    return this.http.post(baseURL, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers() {
    return this.http.get<User[]>('http://localhost:4000/users');
  }

  updateUser(user: User) {
    return this.http.put('http://localhost:4000/users/' + user.id, user);
  }
}
