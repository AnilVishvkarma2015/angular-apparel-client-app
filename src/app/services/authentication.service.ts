import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { AppConfig } from '../config/app.config';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    userAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    currentUserSubject = new BehaviorSubject<string>(this.hasCurrentUser());
    apiBaseURL = AppConfig.settings.apiServer.baseURL;
    
    constructor(private http: HttpClient, private router: Router) { }

    private hasToken(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    isUserLoggedIn(): Observable<boolean> {
        return this.userAuthenticatedSubject.asObservable();
    }

    private hasCurrentUser(): string {
        if (localStorage.getItem('currentUser')) {
            return JSON.parse(localStorage.getItem('currentUser')).firstName;
        }
        return;
    }

    currentUser(): Observable<string> {
        return this.currentUserSubject.asObservable();
    }

    getToken() {
        if (localStorage.getItem('currentUser')) {
            return JSON.parse(localStorage.getItem('currentUser')).token;
        }
        return;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(): boolean {
        var token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    login(email: string, password: string) {
        return this.http.post<any>(this.apiBaseURL + 'users/authenticate', { email: email, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userAuthenticatedSubject.next(true);
                    this.currentUserSubject.next(user.firstName);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.userAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }
}