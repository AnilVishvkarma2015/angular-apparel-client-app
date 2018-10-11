import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { PurchaseOrder } from '../../../models/purchaseorder.model';

@Component({
  selector: 'app-update-po-dialog',
  templateUrl: './update-po-dialog.component.html',
  styleUrls: ['./update-po-dialog.component.scss']
})
export class UpdatePoDialogComponent {
  public statusList = [{ value: 'Pending' }, { value: 'Completed' }];
  isOrderCompleted = false;

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

    let setOrderStatus = [];
    let setOrderQuantity = [];
    let setDeliveryDate = [];
    let setPurchasedPrice = [];
    if (pOrder.orderStatus === 'Completed') {
      this.isOrderCompleted = true;
      setOrderStatus.push({ value: pOrder.orderStatus, disabled: true });
      setOrderQuantity.push({ value: pOrder.orderQuantity, disabled: true });
      setDeliveryDate.push({ value: pOrder.deliveryDate, disabled: true });
      setPurchasedPrice.push({ value: pOrder.purchasedPrice, disabled: true });
    } else {
      setOrderStatus.push(pOrder.orderStatus);
      setOrderQuantity.push(pOrder.orderQuantity);
      setDeliveryDate.push(pOrder.deliveryDate);
      setPurchasedPrice.push(pOrder.purchasedPrice);
    }

    this.form = this.formBuilder.group({
      id: [pOrder.id],
      orderNumber: [{ value: pOrder.orderNumber, disabled: true }],
      orderStatus: setOrderStatus,
      productCategory: [{ value: pOrder.productCategory, disabled: true }],
      productBrand: [{ value: pOrder.productBrand, disabled: true }],
      productName: [{ value: pOrder.productName, disabled: true }],
      supplierName: [{ value: pOrder.supplierName, disabled: true }],
      orderQuantity: setOrderQuantity,
      deliveryDate: setDeliveryDate,
      purchasedPrice: setPurchasedPrice
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
