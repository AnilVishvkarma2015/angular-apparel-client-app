import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { PurchaseOrder } from '../models/purchaseorder.model';
import { ToastService } from './toast.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService {

  constructor(private http: HttpClient, private toastService: ToastService, private utility: UtilityService) { }

  createPO(newOrder: PurchaseOrder) {
    return this.http.post(this.utility.requestUrl() + 'purchaseorders/create', newOrder, this.utility.requestHeaders())
      .subscribe(
        data => {
          this.toastService.openSnackBar('Order Created Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Order Cannot Created', '', 'error-snackbar');
        });
  }

  getPOs() {
    return this.http.get<PurchaseOrder[]>(this.utility.requestUrl() + 'purchaseorders/');
  }

  updatePO(updatedOrder: PurchaseOrder) {
    return this.http.put(this.utility.requestUrl() + 'purchaseorders/' + updatedOrder.id, updatedOrder)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Order Updated Successfully', '', 'success-snackbar');
          return data;
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Order Cannot Updated', '', 'error-snackbar');
        });
  }

  deletePO(deleteOrder: PurchaseOrder) {
    return this.http.delete(this.utility.requestUrl() + 'purchaseorders/' + deleteOrder.id)
      .subscribe(
        data => {
          this.toastService.openSnackBar('Order Deleted Successfully', '', 'success-snackbar');
        },
        error => {
          catchError(this.utility.handleError);
          this.toastService.openSnackBar('Order Cannot Deleted', '', 'error-snackbar');
        });
  }
}
