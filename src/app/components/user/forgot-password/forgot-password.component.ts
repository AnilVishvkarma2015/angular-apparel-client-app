import { Component, OnInit } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import * as _ from 'underscore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from '../../../services/toast.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isMainForm: Observable<boolean>;
  emailResponseMessage: string;
  forgotPasswordForm: FormGroup;
  email: FormControl;
  formSubmitAttempt: boolean;
  loading: boolean;

  constructor(public toastService: ToastService, private utility: UtilityService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.isMainForm = observableOf(true);
  }

  createFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ])
  }

  createForm() {
    this.forgotPasswordForm = new FormGroup({
      email: this.email
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.forgotPasswordForm.get(field).valid && this.forgotPasswordForm.get(field).touched) ||
      (this.forgotPasswordForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  get getFormControls() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.loading = true;

    this.utility.forgotPassword({ email: this.getFormControls.email.value }).pipe()
      .subscribe(response => {
        if (response.code !== 200) {
          this.toastService.openSnackBar(response.message, '', 'warning-snackbar');
          return;
        }
        this.emailResponseMessage = response.message;
        this.isMainForm = observableOf(false);
      }, err => {
        this.toastService.openSnackBar('Data Loading Error: ' + err.status + ' - ' + err.statusText, '', 'error-snackbar');
        throw err;
      });
  }
}
