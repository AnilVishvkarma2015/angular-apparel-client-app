import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent {
  public countryList = ['India'];
  public stateList: Array<any> = [
    { name: 'Maharashtra' },
    { name: 'Madhya Pradesh' },
    { name: 'Rajasthan' },
    { name: 'Bihar' },
    { name: 'Uttar Pradesh' },
  ];
  public cityList: Array<any> = [{ name: "Indore" }];

  form: FormGroup;
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCountry: string;
  customerState: string;
  customerCity: string;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCustomerDialogComponent>) {
    this.form = this.formBuilder.group({
      id: [""],
      customerName: ["", Validators.required],
      customerEmail: ["", Validators.required],
      customerPhone: ["", Validators.required],
      customerCountry: ["", Validators.required],
      customerState: ["", Validators.required],
      customerCity: ["", Validators.required]
    })
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched)
    );
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
