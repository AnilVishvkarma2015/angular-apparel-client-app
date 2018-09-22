import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '../../../services/toast.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formSubmitAttempt: boolean;
  loading: boolean;

  constructor(private router: Router, public toast: ToastService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  get getFormControls() {
    return this.loginForm.controls;
  }

  onSubmit(form: any) {
    this.formSubmitAttempt = true;
    this.loading = true;
    this.authenticationService.login(this.getFormControls.email.value, this.getFormControls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['users']);
        },
        error => {
          this.toast.openSnackBar("Invalid Credentials", '', 'error-snackbar');
          this.loading = false;
        });
  }
}
