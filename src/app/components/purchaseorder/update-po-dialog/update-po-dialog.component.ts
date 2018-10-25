import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PurchaseOrder } from '../../../models/purchaseorder.model';

@Component({
  selector: 'app-update-po-dialog',
  templateUrl: './update-po-dialog.component.html',
  styleUrls: ['./update-po-dialog.component.scss']
})
export class UpdatePoDialogComponent {
  public statusList = [{ value: 'Pending' }, { value: 'Completed' }];
  isOrderCompleted = false;
  poToUpdate: PurchaseOrder;

  form: FormGroup;
  id: string;
  orderNumber: string;
  orderStatus: string;
  supplierName: string;
  quantityOrdered: Number;
  billingAmount: Number;
  deliveryDate: Date;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdatePoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) pOrder: PurchaseOrder) {
    this.poToUpdate = pOrder;
    let setOrderStatus = [];
    let setDeliveryDate = [];
    if (pOrder.orderStatus === 'Completed') {
      this.isOrderCompleted = true;
      setOrderStatus.push({ value: pOrder.orderStatus, disabled: true });
      setDeliveryDate.push({ value: pOrder.deliveryDate, disabled: true });
    } else {
      setOrderStatus.push(pOrder.orderStatus);
      setDeliveryDate.push(pOrder.deliveryDate);
    }

    this.form = this.formBuilder.group({
      id: [pOrder.id],
      orderNumber: [{ value: pOrder.orderNumber, disabled: true }],
      orderStatus: setOrderStatus,
      supplierName: [{ value: pOrder.supplierName, disabled: true }],
      quantityOrdered: [{ value: pOrder.quantityOrdered, disabled: true }],
      deliveryDate: setDeliveryDate,
      billingAmount: [{ value: pOrder.billingAmount, disabled: true }],
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
