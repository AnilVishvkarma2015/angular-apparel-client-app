import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Product } from "../../../models/product.model";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {
  form: FormGroup;
  id: string;
  productName: string;
  productBrand: string;
  productCategory: string;
  productBarcode: string;
  productDescription: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>) {

    this.form = this.formBuilder.group({
      id: [""],
      productName: ["", Validators.required],
      productBrand: ["", Validators.required],
      productCategory: ["", Validators.required],
      productBarcode: ["", Validators.required],
      productDescription: ["", Validators.required]
    });
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