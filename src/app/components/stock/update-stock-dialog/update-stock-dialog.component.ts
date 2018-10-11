import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Stock } from '../../../models/stock.model';

@Component({
  selector: 'app-update-stock-dialog',
  templateUrl: './update-stock-dialog.component.html',
  styleUrls: ['./update-stock-dialog.component.scss']
})
export class UpdateStockDialogComponent {
  public statusOptions = [{ value: 'Active' }, { value: 'Inactive' }];

  form: FormGroup;
  id: string;
  productName: string;
  productBrand: string;
  productCategory: string;
  productBarcode: string;
  stockQuantity: Number;
  stockStatus: string;
  sellingPrice: Number;
  marginPercent: Number;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) stockToUpdate: Stock) {

    this.form = this.formBuilder.group({
      id: [stockToUpdate.id],
      productName: [{ value: stockToUpdate.productName, disabled: true }],
      productBrand: [{ value: stockToUpdate.productBrand, disabled: true }],
      productCategory: [{ value: stockToUpdate.productCategory, disabled: true }],
      productBarcode: [{ value: stockToUpdate.productBarcode, disabled: true }],
      stockQuantity: [{ value: stockToUpdate.stockQuantity, disabled: true }],
      stockStatus: [stockToUpdate.stockStatus, Validators.required],
      sellingPrice: [stockToUpdate.sellingPrice],
      marginPercent: [stockToUpdate.marginPercent, Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched)
    );
  }

  update() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}