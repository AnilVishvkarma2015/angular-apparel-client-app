import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Supplier } from '../../../models/supplier.model';

@Component({
  selector: 'app-update-supplier-dialog',
  templateUrl: './update-supplier-dialog.component.html',
  styleUrls: ['./update-supplier-dialog.component.scss']
})

export class UpdateSupplierDialogComponent {
  public stateList: Array<any> = [
    { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Nashik'] }
  ];

  public cityList: Array<any> = [{ name: "Indore" }];

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
    private dialogRef: MatDialogRef<UpdateSupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) supplier: Supplier
  ) {

    this.form = this.formBuilder.group({
      id: [supplier.id],
      supplierName: [supplier.supplierName, Validators.required],
      supplierCode: [supplier.supplierCode, Validators.required],
      supplierEmail: [supplier.supplierEmail, Validators.required],
      supplierPhone: [supplier.supplierPhone, Validators.required],
      supplierCountry: [supplier.supplierCountry, Validators.required],
      supplierState: [supplier.supplierState, Validators.required],
      supplierCity: [supplier.supplierCity, Validators.required],
      supplierAddress: [supplier.supplierAddress, Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched)
    );
  }

  changeCountry(count: string) {
    this.cityList = this.stateList.find(con => con.name == count).cities;
  }

  update() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
