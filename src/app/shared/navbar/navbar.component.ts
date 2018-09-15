import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isUserLoggedIn: Observable<boolean>;
  currentUser: Observable<string>;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthenticationService) {
    this.isUserLoggedIn = authService.isUserLoggedIn();
    this.currentUser = authService.currentUser();
  }

  onLogout() {
    this.authService.logout();
  }
}