import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  id: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  formSubmitAttempt: boolean;

  constructor(public toast: ToastService, private userService: UserService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.id = new FormControl('', Validators.required);
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
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
    this.userForm = new FormGroup({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.userForm.get(field).valid && this.userForm.get(field).touched) ||
      (this.userForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit(form: any) {
    this.formSubmitAttempt = true;
    this.userService.createUser(form.value);
  }
}
