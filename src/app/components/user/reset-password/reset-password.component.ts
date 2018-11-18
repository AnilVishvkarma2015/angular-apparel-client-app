import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '../../../services/toast.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isMainForm: Observable<boolean>;
  responseMessage: string;
  resetPasswordForm: FormGroup;
  password: FormControl;
  confirmPassword: FormControl;
  resetTokenReceived: string;
  formSubmitAttempt: boolean;
  loading: boolean;

  constructor(public toastService: ToastService, private utility: UtilityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.isMainForm = observableOf(true);
    this.route.queryParams
      .subscribe(params => {
        this.resetTokenReceived = params.token;
      });
  }

  createFormControls() {
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
      this.confirmPassword = new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
  }

  createForm() {
    this.resetPasswordForm = new FormGroup({
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.resetPasswordForm.get(field).valid && this.resetPasswordForm.get(field).touched) ||
      (this.resetPasswordForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  get getFormControls() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.loading = true;
    if (this.getFormControls.password.value !== this.getFormControls.confirmPassword.value) {
      this.toastService.openSnackBar("Password entered do not match!", '', 'error-snackbar');
      return;
    }

    this.utility.resetPassword({ resetToken: this.resetTokenReceived, password: this.getFormControls.password.value }).pipe()
      .subscribe(response => {
        if (response.code !== 200) {
          this.toastService.openSnackBar(response.message, '', 'warning-snackbar');
          return;
        }
        this.responseMessage = response.message;
        this.isMainForm = observableOf(false);
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }
}
