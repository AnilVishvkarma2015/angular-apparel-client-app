import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PurchaseOrder } from '../../../models/purchaseorder.model';

@Component({
  selector: 'app-update-po-dialog',
  templateUrl: './update-po-dialog.component.html',
  styleUrls: ['./update-po-dialog.component.scss']
})
export class UpdatePoDialogComponent {
  public statusList = [{ value: 'Pending' }, { value: 'Completed' }];

  form: FormGroup;
  id: string;
  orderNumber: string;
  orderStatus: string;
  productCategory: string;
  productBrand: string;
  productName: string;
  supplierName: string;
  orderQuantity: Number;
  deliveryDate: Date;
  purchasedPrice: Number

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) pOrder: PurchaseOrder) {

    this.form = this.formBuilder.group({
      id: [pOrder.id],
      orderNumber: [{ value: pOrder.orderNumber, disabled: true }],
      orderStatus: [pOrder.orderStatus, Validators.required],
      productCategory: [{ value: pOrder.productCategory, disabled: true }],
      productBrand: [{ value: pOrder.productBrand, disabled: true }],
      productName: [{ value: pOrder.productName, disabled: true }],
      supplierName: [{ value: pOrder.supplierName, disabled: true }],
      orderQuantity: [pOrder.orderQuantity, Validators.required],
      deliveryDate: [pOrder.deliveryDate, Validators.required],
      purchasedPrice: [pOrder.purchasedPrice, Validators.required]
    })
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
