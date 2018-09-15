import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-supplier-dialog',
  templateUrl: './add-supplier-dialog.component.html',
  styleUrls: ['./add-supplier-dialog.component.scss']
})

export class AddSupplierDialogComponent {
  public country = [{ "countryName": "India" }];
  public states = [{ "stateName": "Maharshtra" }, { "stateName": "Madhya Pradesh" }];
  public cities = [{ "cityName": "Pune" }, { "cityName": "Indore" }, { "cityName": "Ujjain" }];

  public stateList: Array<any> = [
    { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Nashik'] },
    { name: 'Madhya Pradesh', cities: ['Indore', 'Ujjain', 'Dewas'] },
    { name: 'Rajasthan', cities: ['Jaipur'] },
    { name: 'Bihar', cities: ['Mugalsaray'] },
    { name: 'Uttar Pradesh', cities: ['Kanpur'] },
  ];

  public cityList: Array<any> = [{ name: "Indore" }];

  filterChanged(selectedValue: string) {
    console.log('value is ', selectedValue);
  }
  selectedDay: string = '';

  //event handler for the select element's change event
  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    console.log("Selected Data ----", this.selectedDay);
  }

  form: FormGroup;
  id: string;
  supplierName: string;
  supplierCode: string;
  supplierEmail: string;
  supplierPhone: string;
  supplierCountry: string;
  supplierState: string;
  supplierCity: string;
  supplierAddress: string;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSupplierDialogComponent>) {
    this.form = this.formBuilder.group({
      id: [""],
      supplierName: ["", Validators.required],
      supplierCode: ["", Validators.required],
      supplierEmail: ["", Validators.required],
      supplierPhone: ["", Validators.required],
      supplierCountry: ["", Validators.required],
      supplierState: ["", Validators.required],
      supplierCity: ["", Validators.required],
      supplierAddress: ["", Validators.required]
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
