import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Product } from "../../../models/product.model";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent {
  form: FormGroup;
  id: string;
  productName: string;
  productBrand: string;
  productCategory: string;
  productBarcode: string;
  productDescription: string;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) product: Product) {

    this.form = formBuilder.group({
      id: [product.id],
      productName: [product.productName, Validators.required],
      productBrand: [product.productBrand, Validators.required],
      productCategory: [product.productCategory, Validators.required],
      productBarcode: [product.productBarcode, Validators.required],
      productDescription: [product.productDescription, Validators.required]
    });
  }

  update() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}