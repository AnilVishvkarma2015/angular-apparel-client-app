import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  public countryList = ['India'];
  public stateList: Array<any> = [
    { name: 'Maharashtra' },
    { name: 'Madhya Pradesh' },
    { name: 'Rajasthan' },
    { name: 'Bihar' },
    { name: 'Uttar Pradesh' },
  ];

  public cityList: Array<any> = [{ name: "Indore" }];
  userForm: FormGroup;
  editable: boolean = false;
  currentUserName: string
  currentUserEmail: string;
  currentUserPhone: string;
  filtersLoaded: Promise<boolean>;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastService: ToastService) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loadUser(currentUser._id);
  }

  loadUser(userId) {
    this.userService.getUserById(userId).subscribe(currentUser => {
      if (currentUser !== null && currentUser !== undefined) {
        this.createUserForm(currentUser);
        this.filtersLoaded = Promise.resolve(true);
      }
    });
  }

  createUserForm(currentUser) {
    this.editable = false;
    this.currentUserName = currentUser.firstName + ' ' + currentUser.lastName;
    this.currentUserEmail = currentUser.email;
    this.currentUserPhone = currentUser.phone;
    this.userForm = this.formBuilder.group({
      id: [currentUser._id],
      firstName: [currentUser.firstName],
      lastName: [currentUser.lastName],
      email: [currentUser.email],
      phone: [currentUser.phone],
      country: [currentUser.country],
      state: [currentUser.state],
      city: [currentUser.city],
      address: [currentUser.address],
      pincode: [currentUser.pincode],
      changePassword: [""],
      confirmPassword: [""]
    });
  }

  enableEditable() {
    this.editable = true;
  }

  changePassword() {
    if (this.userForm.value.changePassword !== this.userForm.value.confirmPassword) {
      this.toastService.openSnackBar("Password entered do not match!", '', 'error-snackbar');
      return;
    }

    this.onSubmit();
  }

  onSubmit() {
    this.userService.updateUser(this.userForm.value).add(() => {
      const userId = this.userForm.value.id;
      this.loadUser(userId);
    });
  }
}
